<template>
  <div class="icons">
    <router-view :sets="sets"></router-view>
  </div>
</template>

<script>
import brandico from './sets/brandico.json'
import entypo from './sets/entypo.json'
import fontAwesome from './sets/font-awesome.json'
import fontelico from './sets/fontelico.json'
import glyphicons from './sets/glyphicons.json'
import iconicStroke from './sets/iconic-stroke.json'
import ionicons from './sets/ionicons.json'
import maki from './sets/maki.json'
import materialIcons from './sets/material-icons.json'
import openweb from './sets/openweb.json'
import vuestic from './sets/vuestic.json'

const iconTypes = [
  'vuestic',
  'brandico',
  'entypo',
  'fontAwesome',
  'fontelico',
  'glyphicons',
  'iconicStroke',
  'ionicons',
  'maki',
  'openweb',
  'materialIcons',
]

export default {
  name: 'Icons',
  data() {
    return {
      setsPath: './sets/',
    }
  },
  computed: {
    sets() {
      const sets = []
      this.addFilteredListsTo(vuestic)
      sets.push(vuestic)
      this.addFilteredListsTo(openweb)
      sets.push(openweb)
      this.addFilteredListsTo(materialIcons)
      sets.push(materialIcons)
      this.addFilteredListsTo(maki)
      sets.push(maki)
      this.addFilteredListsTo(ionicons)
      sets.push(ionicons)
      this.addFilteredListsTo(iconicStroke)
      sets.push(iconicStroke)
      this.addFilteredListsTo(glyphicons)
      sets.push(glyphicons)
      this.addFilteredListsTo(fontelico)
      sets.push(fontelico)
      this.addFilteredListsTo(fontAwesome)
      sets.push(fontAwesome)
      this.addFilteredListsTo(entypo)
      sets.push(entypo)
      this.addFilteredListsTo(brandico)
      sets.push(brandico)
      console.log(sets)
      return sets
    },
  },
  methods: {
    addFilteredListsTo(set) {
      const list = set.lists[0].icons
      const filteredLists = []
      filteredLists.push(list.slice(0, 6))
      filteredLists.push(list.slice(6, 8))
      filteredLists.push(list.slice(8, 14))
      set.filteredLists = filteredLists
    },
  },
}
</script>
