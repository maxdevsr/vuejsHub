<template>
  <div class="register">
    <div class="title">
      <h1>Agenda virtual</h1>
      <h2>Cadastre aqui</h2>
    </div>
    <br />
    <form
      @submit="submitForm($event)"
      style="display: flex; flex-direction: column"
    >
      <h3>Nome</h3>
      <input
        name="name"
        type="text"
        placeholder="Digite seu nome"
        v-model="name"
      />
      <br />
      <h3>E-mail</h3>
      <input
        name="email"
        type="text"
        placeholder="Digite seu email"
        v-model="email"
      /><br />
      <h3>Senha</h3>
      <input
        name="password"
        type="password"
        placeholder="Digite a sua senha"
        v-model="password"
      /><br />
      <h3>Repita a senha</h3>
      <input
        name="passOk"
        placeholder="Digite novamente sua senha"
        type="password"
      /><br />
      <h3>Fale sobre voce</h3>
      <input
        name="bio"
        type="text"
        placeholder="Fale sobre voce"
        v-model="bio"
      /><br />
      <h3>Tel</h3>
      <input
        name="contact"
        type="text"
        placeholder="Opcao de contato"
        v-model="contact"
      /><br />
      <h3>Tipo</h3>
      <select name="course_module" v-model="course_module">
        <option selected defaultValue="Agenda pessoal">Agenda pessoal</option>
        <option value="Agenda de trabalho">Agenda de trabalho</option>
        <option value="Agenda de estudos">Agenda de estudos</option>
        <option value="Lazer">Lazer</option>
      </select>
      <br />
      <button type="submit" class="btn btn-dark">Cadastrar</button>
    </form>
    <h5 class="link">
      Ja possui login? Clique <a @click="redirectLogin">aqui</a>
    </h5>
  </div>
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

    const redirectLogin = () => {
      return router.push("/login");
    };

    return {
      submitForm,
      name,
      email,
      password,
      bio,
      contact,
      course_module,
      redirectLogin,
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
  width: 100%;
  margin-top: 2px;
}
.register {
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
  padding: 0.5rem;

  border: none;
  outline: 0;
}

select {
  -webkit-border-radius: 30px;
  border-radius: 9px;
  background: #d1d8ec;
  -webkit-box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  width: 16rem;
  height: 2rem;
}

.link {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

a {
  cursor: pointer;
}
</style>
