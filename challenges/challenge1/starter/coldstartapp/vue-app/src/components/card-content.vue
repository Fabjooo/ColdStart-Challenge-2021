<script>
import { mapActions } from 'vuex';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'CardContent',
  components: {
    ButtonFooter,
  },
  props: {
    id: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      user: undefined,
      message: '',
    };
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
    ...mapActions('orders', ['orderProductAction']),
    async order() {
      this.message = 'Your order is being processed.';
      try {
        await this.orderProductAction(this.id);
        this.message = 'Thank you for your order.';
      } catch (error) {
        this.message = 'Something went wrong.';
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.message = '';
    },
  },
};
</script>

<template>
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="card-footer" v-if="user">
      <ButtonFooter @clicked="order" label="Order"></ButtonFooter>
      <div class="card-footer-item" v-if="message">{{message}}</div>
    </div>
  </div>
</template>
