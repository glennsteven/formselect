<template>
  <div class="flex-col">
    <div v-for="(loop, index) in country" :key="index">
      {{ loop }}
      <button class="ml-4 text-red-600 hover:text-red-400" @click="deleteCOUNTRY(index)">
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    country: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    deleteCOUNTRY (index) {
      this.$emit('deleteCountry', index)
    }
  }
}
</script>
