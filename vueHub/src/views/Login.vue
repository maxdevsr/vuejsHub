<template>
  <div>
    <h1>Login</h1>
    <br />
    <br />
    <form
      @submit="logOnForm($event)"
      style="display: flex; flex-direction: column"
    >
      <h2>E-mail</h2>
      <input
        name="email"
        type="text"
        placeholder="Digite seu email"
        v-model="email"
      />
      <br />
      <h2>Senha</h2>
      <input
        name="password"
        type="password"
        placeholder="Digite a sua senha"
        v-model="password"
      />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../services/api";
import * as yup from "yup";
import router from "../router";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

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

    function logOnForm(e) {
      e.preventDefault();
      const user = {
        email: email.value,
        password: password.value,
      };
      console.log(user);
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

    return {
      logOnForm,
      email,
      password,
    };
  },
};
</script>
