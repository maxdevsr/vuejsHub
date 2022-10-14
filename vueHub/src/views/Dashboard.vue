<template>
  <div class="dashboard">
    <div class="title">
      <div>
        <h3>Bem vindo a sua agenda pessoal {{ userName }} !</h3>
        <h4>Finalidade de sua agenda: {{ course }}</h4>
      </div>
      <button class="btn btn-danger" @click="sair">SAIR</button>
    </div>

    <div @click="exibeAdicionar = true" v-if="!exibeAdicionar">
      <button class="btn btn-dark">Adicionar tarefa</button>
    </div>
    <div @click="exibeAdicionar = false" v-else>
      <button class="btn btn-dark">Fechar</button>
    </div>

    <div class="paiForm" @click="modal" v-if="exibeAdicionar">
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
        <button
          class="btn btn-success"
          style="margin-bottom: 1rem"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
    <br />
    <br />
    <div class="lista">
      <h3>Compromissos</h3>
      <br />
      <br />
      <br />
      <ul>
        <li v-for="techText in techs" :key="techText.id">
          <h5>{{ techText.title }}</h5>
          <h6>{{ techText.status }}</h6>
          <button class="btn btn-dark" @click="removeTech(techText.id)">
            Remover
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const newTech = ref("");
    const status = ref("");
    const exibeAdicionar = ref(false);

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
          exibeAdicionar.value = false;
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
      exibeAdicionar,
    };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
  padding: 1rem;
  margin-bottom: 5rem;

  -webkit-box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
  box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
}

.paiForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #4d4f51;
  border-radius: 8px;
  width: 30rem;
  align-items: center;
  -webkit-box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
  box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
}
.lista {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  -webkit-border-radius: 30px;
  border-radius: 9px;
  background: #d1d8ec;
  -webkit-box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  box-shadow: 5px 5px 12px #54565e, -5px -5px 12px #ffffff;
  width: 16rem;
  height: 2rem;
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

ul {
  width: 80%;
  -webkit-box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
  box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
}

li {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  margin-bottom: 1rem;
  background-color: #25282a;
  border-radius: 8px;
  height: 4rem rem;
  -webkit-box-shadow: inset 10px -13px 14px 1px rgba(0, 0, 0, 0.9);
  box-shadow: inset 10px -13px 14px 1px rgba(0, 0, 0, 0.9);
}

li h5 {
  width: 21rem;
}

li h6 {
  width: 21rem;
}
</style>
