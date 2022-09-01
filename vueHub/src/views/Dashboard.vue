<template>
  <button @click="sair">SAIR</button>
  <h1>Bem vindo {{ userName }}</h1>

  <h2>Aluno do {{ course }}</h2>

  <h3>Adicionar tech</h3>
  <form @submit="addTech($event)">
    <h4>Tech</h4>
    <input
      name="newTech"
      type="text"
      placeholder="Tecnologia"
      v-model="newTech"
    />
    <br />
    <h4>Nivel</h4>
    <select name="status" v-model="status">
      <option defaultValue="Iniciante">Iniciante</option>
      <option value="Intermediario">Intermediario</option>
      <option value="Avancado">Avancado</option>
    </select>
    <br />
    <button type="submit">Cadastrar</button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import router from "../router";
import api from "../services/api";
export default {
  setup() {
    const userName = JSON.parse(localStorage.getItem("@userName"));
    const course = JSON.parse(localStorage.getItem("@userCourse"));
    const ID = JSON.parse(localStorage.getItem("@userId"));
    const bearer = JSON.parse(localStorage.getItem("@atriaToken"));

    const techs = ref([]);

    const sair = () => {
      localStorage.clear();
      return router.push("/login");
    };

    // watch(
    //   () => techs,
    //   () => {
    function getUser() {
      api
        .get(`/users/${ID}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        .then((res) => {
          console.log(res);
          techs.value = res.data.techs;
          console.log(techs);
        });
    }
    getUser();
    //   }
    // );
    const newTech = ref("");
    const status = ref("");

    const addTech = (e) => {
      e.preventDefault();
      const techAdd = {
        title: newTech.value,
        status: status.value,
      };
      console.log(techAdd);
      //   api
      //     .post("/users/techs", techAdd, {
      //       headers: {
      //         Authorization: `Bearer ${bearer}`,
      //       },
      //     })
      //     .then((response) => {
      //       console.log(response);
      //     });
    };

    return {
      sair,
      userName,
      course,
      getUser,
      addTech,
    };
  },
};
</script>
