<template>
  <div class="container" v-motion-slide-right>
    <div class="brand-logo">
      <a
        id="imgClick"
        href="https://github.com/maxdevsr/vuejsHub"
        target="_blank"
      >
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
      </a>
    </div>
    <div class="brand-title">Agenda pessoal</div>
    <form
      class="inputs"
      @submit="logOnForm($event)"
      :validation-schema="schemaLogin"
    >
      <label>EMAIL</label>
      <input
        name="email"
        type="email"
        placeholder="Digite seu email"
        v-model="email"
      />
      <label>PASSWORD</label>
      <input
        name="password"
        type="password"
        placeholder="Digite a sua senha"
        v-model="password"
      />
      <button type="submit">LOGIN</button>
      <button id="registrar" type="button" @click="redirectRegister">
        REGISTRAR
      </button>
    </form>
    <a id="footer" href="https://macsonsoares.vercel.app/">MADE BY MACSON</a>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../services/api";
import * as yup from "yup";
import { useRouter } from "vue-router";
import "../assets/main.css";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const schemaLogin = yup.object().shape({
      name: yup.string().required("Campo obrigatorio"),
      email: yup.string().email("Email invalido").required("Campo obrigatorio"),
      password: yup
        .string()
        .min(8, "Minimo 8 digitos")
        .required("Campo obrigatorio"),
      passOk: yup
        .string()
        .oneOf([yup.ref("password")], "Senhas diferentes")
        .required("Campo obrigatorio"),
      bio: yup.string().required("Campo obrigatorio"),
      contact: yup.string().required("Campo obrigatorio"),
      course_module: yup.string(),
    });

    function logOnForm(e) {
      e.preventDefault();
      const user = {
        email: email.value,
        password: password.value,
      };
      api
        .post("/sessions", user)
        .then((res) => {
          console.log(res);

          const { token } = res.data;
          localStorage.setItem("@atriaToken", JSON.stringify(token));
          localStorage.setItem("@userName", JSON.stringify(res.data.user.name));
          localStorage.setItem("@userId", JSON.stringify(res.data.user.id));
          localStorage.setItem(
            "@userCourse",
            JSON.stringify(res.data.user.course_module)
          );

          console.log(localStorage);

          return router.push("/dashboard");
        })

        .catch((err) => console.log(err));
    }

    const redirectRegister = () => {
      return router.push("/register");
    };

    return {
      schemaLogin,
      logOnForm,
      email,
      password,
      redirectRegister,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap");

input {
  caret-color: red;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: hidden;
  font-family: poppins;
}

.container {
  position: relative;
  width: 35%;
  border-radius: 20px;
  margin-top: 7rem;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.brand-logo {
  height: 100px;
  width: 100px;
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
  background: white;
}

a img {
  width: 100%;
  cursor: pointer;
}

.brand-title {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.8rem;
  color: #1da1f2;
  letter-spacing: 1px;
  font-family: poppins;
  text-shadow: 4px 0 4px rgba(0, 0, 0, 0.25);
}

.inputs {
  text-align: left;
  margin-top: 30px;
}

label,
input,
button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

button {
  color: white;
  margin-top: 20px;
  background: #1da1f2;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
}

#registrar {
  color: black;
  margin-top: 20px;
  background: white;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}

#registrar:hover {
  box-shadow: none;
}

#footer {
  position: absolute;
  font-size: 8px;
  bottom: 4px;
  right: 4px;
  text-decoration: none;
  color: black;
  background: yellow;
  border-radius: 10px;
  padding: 2px;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
