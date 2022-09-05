<template>
  <div>
    <button @click="sair">SAIR</button>
    <h1>Bem vindo a sua agenda pessoal {{ userName }} !</h1>

    <h2>Finalidade: {{ course }}</h2>

    <div @click="modal" v-if="true">
      <h4>Adicionar tarefa</h4>

      <form @submit="addTech($event)">
        <h4>Compromisso</h4>
        <input
          name="newTech"
          type="text"
          placeholder="Diga pra mim"
          v-model="newTech"
        />
        <br />
        <h4>Tipo</h4>
        <select name="status" v-model="status">
          <option defaultValue="Importante">Importante</option>
          <option value="Muito importante">Muito importante</option>
          <option value="Tranquilo">Tranquilo</option>
          <option value="Quando der">Quando der</option>
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    <div>
      <h3>Compromissos</h3>
      <ul>
        <li v-for="techText in techs" :key="techText.id">
          <h5>{{ techText.title }}</h5>
          <h5>{{ techText.status }}</h5>
          <button @click="removeTech(techText.id)">Remover</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import router from "../router";
import api from "../services/api";
export default {
  setup() {
    const newTech = ref("");
    const status = ref("");

    const count = ref(0);

    const techs = ref([]);

    const userName = JSON.parse(localStorage.getItem("@userName"));
    const course = JSON.parse(localStorage.getItem("@userCourse"));
    const ID = JSON.parse(localStorage.getItem("@userId"));
    const bearer = JSON.parse(localStorage.getItem("@atriaToken"));

    const addTech = (e) => {
      e.preventDefault();
      const techAdd = {
        title: newTech.value,
        status: status.value,
      };
      console.log(techAdd);
      api
        .post("/users/techs", techAdd, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        .then((res) => {
          console.log(res);
          count.value += 1;
        })
        .catch((err) => console.log(err));
    };

    watch(count, () => {
      getUser();
      console.log("entrou aqui");
    });

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
          console.log(techs.value);
        });
    }
    getUser();

    function removeTech(id) {
      api
        .delete(`/users/techs/${id}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        .then((res) => {
          console.log(res);
          count.value += 1;
        });
    }

    const sair = () => {
      localStorage.clear();
      return router.push("/login");
    };

    const modal = () => {
      return true;
    };

    return {
      sair,
      userName,
      course,
      getUser,
      addTech,
      newTech,
      status,
      techs,
      modal,
      removeTech,
    };
  },
};
</script>
