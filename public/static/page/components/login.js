import { Component } from "../../js/component.js";
import {} from "./account/panel.js";
import {} from "./account/slide.js";

customElements.define(
  "x-login-panel",
  class extends Component {
    static url = import.meta.url;

    onCreate(shadowRoot, internals) {
      const modal = this.closest("x-modal");

      const panel = shadowRoot.querySelector("#panel");

      const idSlide = panel.querySelector("#id-slide");
      const passwordSlide = panel.querySelector("#password-slide");

      let id;

      idSlide.addEventListener("submit", async () => {
        const value = idSlide.value;

        const validation = await fetch("/api/validate/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: value }),
        }).then((res) => res.json());

        if (!validation.exists) {
          idSlide.throwError("Wrong ID.");
          return;
        }

        id = value;
        panel.nextSlide();
      });

      passwordSlide.addEventListener("submit", async () => {
        const password = passwordSlide.value;

        const res = await fetch("/user/log", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        });

        if (!res.ok) {
          passwordSlide.throwError("Wrong password.");
          return;
        }

        modal.close(true);
      });

      this.replaceWith(...shadowRoot.childNodes);

      idSlide.focus();
    }
  }
);
