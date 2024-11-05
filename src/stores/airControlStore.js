// stores/counter.js
import { defineStore } from 'pinia'

export const useAirControlStore = defineStore('aircontrol', {
  state: () => {
    return {
      groupZones: [
        {
          active: false,
          collectionZones: [1, 2, 3],
          id: 11,
          name: 'primera planta',
        },
        {
          active: false,
          collectionZones: [4, 5],
          id: 1,
          name: 'segunda planta',
        },
      ],
      zones: [
        {
          active: false,
          id: 1,
          indicatedTemperature: 20,
          temperature: 16,
          name: 'salon',
          mode: '',
        },
        {
          active: false,
          id: 2,
          indicatedTemperature: 20,
          temperature: 20,
          name: 'comedor',
          mode: '',
        },
        {
          active: false,
          id: 3,
          indicatedTemperature: 20,
          temperature: 22,
          name: 'baño',
          mode: '',
        },
        {
          active: false,
          id: 4,
          indicatedTemperature: 20,
          temperature: 4,
          name: 'garaje',
          mode: '',
        },
        {
          active: false,
          id: 5,
          indicatedTemperature: 20,
          temperature: 22,
          name: 'habitacion invitados',
          mode: '',
        },
      ],
    }
  },

  getters: {},
  actions: {
    /**
     * Método que busca las zonas que pertenecen a un grupo
     * @param {Number} id
     * @return String
     */
    getZonesToGroup(id) {
      const zones = []
      const group = this.getGroup(id)
      for (const zone of this.zones) {
        if (group.collectionZones.includes(zone.id)) {
          zones.push(zone)
        }
      }
      return zones
    },
    /**
     * Método que nos devuelve el grupo
     * @param {Number} id
     * @return String
     */
    getGroup(id) {
      return this.groupZones.find(group => group.id === id)
    },
    /**
     * Método que busca las zonas que pertenecen a un grupo y las activa o desactiva
     * @param {Boolean} active activar/desactivar
     * @param {Number} index indice del grupo
     * @return String
     */
    toggleActivationGroup(active, id) {
      const zones = this.getZonesToGroup(id)
      for (const zone of zones) {
        active ? (zone.active = true) : (zone.active = false)
        if (zone.active) {
          this.setModeZone(zone)
        } else {
          zone.mode = 'off'
        }
      }
    },
    /**
     * Método que busca las zona y la activa o desactiva
     * @param {Number} id indice del grupo
     * @return String
     */
    toggleActivationZone(id) {
      const zone = this.zones.find(zone => zone.id === id)
      zone.active = !zone.active
      if (zone.active) {
        this.setModeZone(zone)
      } else {
        zone.mode = 'off'
      }
    },
    /**
     * Método que elimina un grupo
     * @param {Number} id indice del grupo
     * @return String
     */
    deleteGroup(id) {
      const index = this.groupZones.findIndex(group => group.id === id)
      this.groupZones.splice(index, 1)
    },
    saveGroup(info) {
      let indexGroup = this.groupZones.findIndex(group => group.id === info.id)
      this.groupZones[indexGroup] = info
    },
    newGroup(info) {
      let collectionIds = this.groupZones.map(group => group.id)
      info.id = Math.max(...collectionIds) + 1
      this.groupZones.push(info)
    },
    setValuesZone(info) {
      let zone = this.zones.find(zone => zone.id === info.id)
      zone.indicatedTemperature = info.indicatedTemperature
      zone.name = info.name
    },
    setModeZone(zone) {
      if (zone.indicatedTemperature === zone.temperature) {
        zone.mode = 'confort'
      } else if (zone.indicatedTemperature < zone.temperature) {
        zone.mode = 'cool'
      } else if (zone.indicatedTemperature > zone.temperature) {
        zone.mode = 'heat'
      }
    },
    setTemperature() {
      for (const zone of this.zones) {
        if (zone.active && zone.mode !== 'confort') {
          if (zone.indicatedTemperature < zone.temperature) {
            zone.temperature = zone.temperature - 1
            console.log(zone.temperature)
          }
          if (zone.indicatedTemperature > zone.temperature) {
            zone.temperature = zone.temperature + 1
            console.log(zone.temperature)
          }
          if (zone.indicatedTemperature === zone.temperature) {
            zone.mode = 'confort'
          }
        }
      }
    },
  },
})
