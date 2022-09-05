<template>
  <div class="login">
    <div class="title">
      <h1>Login</h1>
    </div>
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
      <button type="submit" class="btn btn-dark">Login</button>
    </form>
    <h5 class="link">
      Não possui conta? Clique <a @click="redirectRegister">aqui</a>
    </h5>
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

    const schema = yup.object().shape({
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

    const redirectRegister = () => {
      return router.push("/register");
    };

    return {
      logOnForm,
      email,
      password,
      redirectRegister,
    };
  },
};
</script>

<style scoped>
.title {
  display: flex;

  flex-direction: column;
  align-items: center;

  -webkit-box-shadow: 0px 17px 8px -3px rgba(0, 0, 0, 0.94);
  box-shadow: 0px 17px 8px -3px rgba(0, 0, 0, 0.94);
  width: 99%;
  margin-top: 2px;
}

.login {
  margin-top: 2rem;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  background: #d1d8ec;
  -webkit-box-shadow: 21px 21px 55px #54565e, -21px -21px 55px #ffffff;
  box-shadow: 21px 21px 55px #54565e, -21px -21px 55px #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30rem;
}

input {
  -webkit-border-radius: 30px;
  border-radius: 9px;
  background: #d1d8ec;
  -webkit-box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  width: 16rem;
  height: 2rem;
  border: none;
  outline: 0;

  padding: 0.5rem;
}

.link {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

a {
  cursor: pointer;
}
</style>
