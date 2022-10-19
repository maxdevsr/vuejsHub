<template>
  <div class="dashboard" v-motion-slide-top>
    <div class="title">
      <div>
        <h3>
          Bem vindo a sua agenda pessoal
          {{
            userName.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
              letra.toUpperCase()
            )
          }}
          !
        </h3>
        <h6>{{ tipoAgenda }}</h6>
      </div>
      <button class="btnSair" @click="sair">SAIR</button>
    </div>
    <div class="vitrine">
      <div id="modal">
        <div
          v-motion-slide-left
          @click="exibeAdicionar = true"
          v-if="!exibeAdicionar"
        >
          <button class="btn btn-dark">Adicionar tarefa</button>
        </div>
        <div v-motion-slide-right @click="exibeAdicionar = false" v-else>
          <button class="btn btn-dark">Fechar</button>
        </div>
        <div
          id="paipai"
          @click="modal"
          v-if="exibeAdicionar"
          v-motion-slide-top
        >
          <form class="paiForm" @submit="addTarefa($event)">
            <div>
              <h4>Compromisso</h4>
              <input
                name="novaTarefa"
                type="text"
                placeholder="Diga pra mim"
                v-model="novaTarefa"
              />
            </div>
            <div>
              <h4>Tipo</h4>
              <select name="status" v-model="status">
                <option defaultValue="Estudo">Estudo</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <button
              class="btn btn-success"
              style="margin-bottom: 1rem; width: 80%; justify-content: center"
              type="submit"
              id="btnCadastrar"
            >
              Salvar
            </button>
          </form>
        </div>
        <div class="paiForm2" v-else v-motion-slide-bottom>
          <h4>
            {{ liveText }}
          </h4>
          <a
            href="https://github.com/maxdevsr/vuejsHub"
            target="_blank"
            class="text-center"
            >GitHub</a
          >
        </div>
      </div>

      <div class="lista">
        <ul class="btn-group" role="group" id="buttonFIlter">
          <li
            class="btn btn-secondary"
            id="btnfilter"
            @click="filter('Estudo')"
            tabindex="0"
            style="border-radius: 10px 0px 0px 10px"
          >
            Estudo
          </li>
          <li
            class="btn btn-secondary"
            id="btnfilter"
            @click="filter('Lazer')"
            tabindex="0"
          >
            Lazer
          </li>
          <li
            class="btn btn-secondary"
            id="btnfilter"
            @click="filter('Trabalho')"
            tabindex="0"
          >
            Trabalho
          </li>
          <li
            class="btn btn-secondary"
            id="btnfilter"
            @click="filter('Outros')"
            tabindex="0"
          >
            Outros
          </li>
          <li
            class="btn btn-secondary"
            id="btnfilter"
            @click="filter()"
            tabindex="0"
            style="border-radius: 0px 10px 10px 0px"
          >
            Todos
          </li>
        </ul>
        <ul>
          <li
            class="container"
            v-for="techText in tarefasUserFiltered"
            :key="techText.id"
            v-motion-slide-top
          >
            <h5>{{ techText.title }}</h5>
            <h6>{{ techText.status }}</h6>
            <div>
              <button
                id="btnRemove"
                class="btn btn-dark"
                @click="removeTarefa(techText.id)"
              >
                Remover
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

export default {
  setup() {
    onMounted(() => {
      getUser();
    });

    const router = useRouter();
    const novaTarefa = ref("");
    const status = ref("");
    const exibeAdicionar = ref(false);
    const ID = JSON.parse(localStorage.getItem("@userId"));
    const bearer = JSON.parse(localStorage.getItem("@atriaToken"));
    const count = ref(0);

    const userName = ref("");
    const tipoAgenda = ref("");

    const tarefasUser = ref([]);
    const tarefasUserFiltered = ref([]);

    async function getUser() {
      try {
        const meusDados = await api.get(`/users/${ID}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        tarefasUser.value = meusDados.data.techs;
        userName.value = meusDados.data.name;
        tipoAgenda.value = meusDados.data.course_module;
        filter();
      } catch (error) {
        console.log(error);
      }
    }
    getUser();

    const filter = (status) => {
      if (status) {
        tarefasUserFiltered.value = tarefasUser.value.filter(
          (elem) => elem.status === status
        );
      } else {
        tarefasUserFiltered.value = tarefasUser.value;
      }

      console.log(tarefasUserFiltered.value, status);
    };

    const liveText = ref("");
    const meuTexto = `Bem vindo a sua agenda pessoal, coloque aqui suas tarefas e volte para consulta-las quando quiser!
    Visite o codigo no link abaixo`;
    const interval = 200;

    function showTextLive(liveText, meuTexto, interval) {
      const character = meuTexto.split("").reverse();

      const typer = setInterval(function () {
        if (!character.length) {
          return clearInterval(typer);
        }
        const nextChar = character.pop();
        liveText.value += nextChar;
      }, interval);
    }

    showTextLive(liveText, meuTexto, interval);

    const addTarefa = (e) => {
      e.preventDefault();
      const tarefaAtual = {
        title: novaTarefa.value,
        status: status.value,
      };
      console.log(tarefaAtual);
      api
        .post("/users/techs", tarefaAtual, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        .then((res) => {
          count.value += 1;
          exibeAdicionar.value = false;
        })
        .catch((err) => console.log(err));
    };

    watch(count, () => {
      getUser();
    });

    function removeTarefa(id) {
      api
        .delete(`/users/techs/${id}`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
        .then((res) => {
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
      tipoAgenda,
      getUser,
      addTarefa,
      novaTarefa,
      status,
      tarefasUser,
      modal,
      removeTarefa,
      exibeAdicionar,
      liveText,
      filter,
      tarefasUserFiltered,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap");

li {
  list-style: none;
}

.dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  padding: 1rem 2rem 2rem 2rem;
}
.title {
  width: 100%;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  display: flex;
  justify-content: space-between;
  font-family: poppins;
  margin-bottom: 2rem;
}

.vitrine {
  display: flex;
  height: 70%;
}

#modal {
  height: 100%;
  width: 30%;
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  border-radius: 20px;
  align-items: center;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  font-family: poppins;
}

.paiForm {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin: 2rem 0rem 0rem 0rem;
  padding: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.paiForm div {
  width: 100%;
}

#paipai {
  width: 80%;
  height: 80%;
}

.paiForm2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  margin: 2rem 0rem 0rem 0rem;
  padding: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: inset 14px 14px 20px #cbced1, inset -14px -14px 20px white;
}

.container div {
  width: 100%;
  display: flex;
  justify-content: end;
}

.btn {
  color: white;
  background: #ce5151;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
  border: none;
}

.btnSair {
  color: white;
  background: #f10000;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
  border: none;
}

#btnCadastrar {
  color: white;
  background: #1da1f2;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
  border: none;
}

.btn:hover {
  box-shadow: none;
}

#btnCadastrar:hover {
  box-shadow: none;
}

.btnSair:hover {
  box-shadow: none;
}

form {
  display: flex;
  flex-direction: column;
  background-color: #4d4f51;
  border-radius: 8px;
  width: 30rem;
  align-items: center;
  -webkit-box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
  box-shadow: 0px 29px 19px 8px rgba(0, 0, 0, 0.94);
}
.lista {
  display: flex;
  flex-direction: column;
  background: #ecf0f3;
  width: 70%;
  height: 100%;
  margin-left: 2rem;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  border-radius: 20px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  font-family: poppins;
  overflow: auto;
}

input {
  width: 100%;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  border: none;
}

.btnRemove {
  display: flex;
}
.lista h3 {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 2.5rem;
}
.lista ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

select {
  width: 100%;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  border: none;
}

.container {
  width: 350px;
  border-radius: 20px;
  margin: 1rem;
  padding: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: inset 14px 14px 20px #cbced1, inset -14px -14px 20px white;
}

li h5 {
  border-radius: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  padding: 1rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: poppins;
  margin-bottom: 1.5rem;
}

li h6 {
  border-radius: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  padding: 1rem;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: poppins;
  margin-bottom: 1.5rem;
  text-align: center;
}

#buttonFIlter {
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

#btnfilter {
  display: flex;
  justify-content: center;
  background: gray;
  cursor: pointer;
  font-size: 13px;
  border-radius: 0.5px;
  width: 20%;
  box-shadow: none;
}

#btnfilter:focus {
  background: blue;
}
</style>
