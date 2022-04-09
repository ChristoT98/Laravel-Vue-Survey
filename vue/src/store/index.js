import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "Sample Title",
    slug: "Sample Slug",
    status: "draft",
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description: "Sample description",
    created_at: "2022-04-09 18:00:00",
    updated_at: "2022-04-09 18:00:00",
    expire_date: "2022-04-25 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "USA"},
            {uuid: "e94bcf3e-b7d0-11ec-b909-0242ac120002", text: "Georgia"},
            {uuid: "0ac49510-b7d1-11ec-b909-0242ac120003", text: "Germany"},
            {uuid: "14adbc3c-b7d1-11ec-b909-0242ac120004", text: "India"},
            {uuid: "2807b4cc-b7d1-11ec-b909-0242ac120005", text: "Sri Lanka"},
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which languages do you want to learn?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae",
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52eb", text: "JavaScript"},
            {uuid: "e94bcf3e-b7d0-11ec-b909-0242ac120006", text: "PHP"},
            {uuid: "0ac49510-b7d1-11ec-b909-0242ac120007", text: "HTML"},
            {uuid: "14adbc3c-b7d1-11ec-b909-0242ac120008", text: "Python"},
            {uuid: "2807b4cc-b7d1-11ec-b909-0242ac120009", text: "Java"},
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question: "Which frameworks do you want to learn?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae",
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ec", text: "Laravel"},
            {uuid: "e94bcf3e-b7d0-11ec-b909-0242ac120016", text: "Codeignitor"},
            {uuid: "0ac49510-b7d1-11ec-b909-0242ac120017", text: "React"},
            {uuid: "14adbc3c-b7d1-11ec-b909-0242ac120018", text: "Vue"},
            {uuid: "2807b4cc-b7d1-11ec-b909-0242ac120019", text: "Symfony"},
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "Which frameworks do you love most?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae",
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ed", text: "Laravel 8"},
            {uuid: "e94bcf3e-b7d0-11ec-b909-0242ac120026", text: "Codeignitor 3"},
            {uuid: "0ac49510-b7d1-11ec-b909-0242ac120027", text: "React 17"},
            {uuid: "14adbc3c-b7d1-11ec-b909-0242ac120028", text: "Vue 3"},
            {uuid: "2807b4cc-b7d1-11ec-b909-0242ac120029", text: "Symfony 1"},
          ],
        },
      },
      {
        id: 5,
        type: "checkbox",
        question: "Which projects do you want to build with laravel?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae",
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ee", text: "REST API"},
            {uuid: "e94bcf3e-b7d0-11ec-b909-0242ac12036", text: "E-Commerce"},
            {uuid: "0ac49510-b7d1-11ec-b909-0242ac120037", text: "Real Estate"},
            {uuid: "14adbc3c-b7d1-11ec-b909-0242ac120038", text: "All of the above"},
          ],
        },
      },
      {
        id: 6,
        type: "text",
        question: "What is your favorite channel?",
        description: null,
        data: {},
      },
      {
        id: 7,
        type: "textarea",
        question: "What do you think about this channel?",
        description: "Write your opinion",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "Laravel 8",
    slug: "laravel-8",
    status: "active",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    description: "Sample description 2",
    created_at: "2022-04-10 18:00:00",
    updated_at: "2022-04-10 18:00:00",
    expire_date: "2022-04-30 18:00:00",
    questions: [],
  },
  {
    id: 300,
    title: "Vue-3",
    slug: "vue-3",
    status: "active",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png",
    description: "Sample description 3",
    created_at: "2022-04-11 18:00:00",
    updated_at: "2022-04-11 18:00:00",
    expire_date: "2022-04-30 15:00:00",
    questions: [],
  },
  {
    id: 400,
    title: "Tailwind-3",
    slug: "tailwind-3",
    status: "active",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    description: "Sample description 4",
    created_at: "2022-04-12 18:00:00",
    updated_at: "2022-04-12 18:00:00",
    expire_date: "2022-04-30 15:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },

    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },

    logout({commit}) {
      return axiosClient.post('/logout')
        .then((response) => {
          commit('logout');
          return response;
        })
    },

  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      state.user.data = {}
      sessionStorage.removeItem('TOKEN')
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  modules: {}
})

export default store;
