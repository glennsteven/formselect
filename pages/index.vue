<template>
  <div id="app" class="mx-10 my-10">
    <h1>Form Search Select</h1>
    <div class="flex flex-col h-20">
      <form class="w-full flex flex-col w-1/3">
        <input
          v-model="selected"
          name="selected"
          type="text"
          list="options"
          class="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="-Select an Options"
        >
        <datalist id="options" class="bg-red-500">
          <option v-for="datas in country" :key="datas">
            {{ datas }}
          </option>
        </datalist>
      </form>
      <button class="hover:text-gray-400" @click="add">
        ADD
      </button>
    </div>
    <FormSelect :country="addCountry" @deleteCountry="deleteCountry" />
  </div>
</template>

<script>
export default {
  el: '#app',
  data () {
    return {
      noResult: 'No Result Data',
      selected: '',
      addCountry: [],
      country: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.loadCountry()
    },
    add () {
      if (this.selected.length === 0) { return false }
      this.addCountry.push(this.selected)
    },
    loadCountry () {
      this.$axios
        .get('https://api.first.org/data/v1/countries?q=in')
        .then(({ data }) => {
          const response = data.data
          for (const key of Object.keys(response)) {
            this.country.push(response[key].country + `, ${response[key].region}`)
          }
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
          this.errored = true
        })
        .finally(() => (this.loading = false))
    },
    deleteCountry (countryIndex) {
      // eslint-disable-next-line array-callback-return
      this.addCountry = this.addCountry.filter((item, index) => {
        if (index !== countryIndex) {
          return item
        }
      })
    }
  }
}
</script>
