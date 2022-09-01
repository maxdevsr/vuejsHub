<template>
  <h1>Register</h1>
  <br />
  <br />
  <form
    @submit="submitForm($event)"
    style="display: flex; flex-direction: column"
  >
    <h2>Nome</h2>
    <input
      name="name"
      type="text"
      placeholder="Digite seu nome"
      v-model="name"
    />
    <br />
    <h2>E-mail</h2>
    <input
      name="email"
      type="text"
      placeholder="Digite seu email"
      v-model="email"
    /><br />
    <h2>Senha</h2>
    <input
      name="password"
      type="password"
      placeholder="Digite a sua senha"
      v-model="password"
    /><br />
    <h2>Repita a senha</h2>
    <input
      name="passOk"
      placeholder="Digite novamente sua senha"
      type="password"
    /><br />
    <h2>Fale sobre voce</h2>
    <input
      name="bio"
      type="text"
      placeholder="Fale sobre voce"
      v-model="bio"
    /><br />
    <h2>Tel</h2>
    <input
      name="contact"
      type="text"
      placeholder="Opcao de contato"
      v-model="contact"
    /><br />
    <h2>Modulo</h2>
    <select name="course_module" v-model="course_module">
      <option selected defaultValue="Primeiro módulo (Introdução ao Frontend)">
        Primeiro modulo (Introdução ao Frontend)
      </option>
      <option value="Segundo módulo (Frontend Avançado)">
        Segundo modulo (Frontend Avançado)
      </option>
      <option value="Terceiro módulo (Introdução ao Backend)">
        Terceiro modulo (Introdução ao Backend)
      </option>
      <option value="Quarto módulo (Introdução ao Backend)">
        Quarto modulo (Backend Avançado)
      </option>
    </select>
    <br />
    <button type="submit">Cadastrar</button>
  </form>
</template>

<script>
import { ref } from "vue";
import api from "../services/api";
import * as yup from "yup";
import router from "../router";

export default {
  name: "Register",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const bio = ref("");
    const contact = ref("");
    const course_module = ref("");

    // const schema = yup.object().shape({
    //   name: yup.string().required("Campo obrigatorio"),
    //   email: yup.string().email("Email invalido").required("Campo obrigatorio"),
    //   password: yup
    //     .string()
    //     .min(8, "Minimo 8 digitos")
    //     .required("Campo obrigatorio"),
    //   passOk: yup
    //     .string()
    //     .oneOf([yup.ref("password")], "Senhas diferentes")
    //     .required("Campo obrigatorio"),
    //   bio: yup.string().required("Campo obrigatorio"),
    //   contact: yup.string().required("Campo obrigatorio"),
    //   course_module: yup.string(),
    // });

    function submitForm(e) {
      e.preventDefault();
      const user = {
        name: name.value,
        email: email.value,
        password: password.value,
        bio: bio.value,
        contact: contact.value,
        course_module: course_module.value,
      };
      console.log(user);
      api
        .post("/users", user)
        .then((res) => {
          console.log(res);
          return router.push("/login");
        })

        .catch((err) => console.log(err));
    }

    return {
      submitForm,
      name,
      email,
      password,
      bio,
      contact,
      course_module,
    };
  },
};
</script>
