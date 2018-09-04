<template>
  <span class="yd-badge">
    <span :class="'yd-badge-status--' + status" class="yd-badge__dot" />
    <span class="yd-badge__text">{{ text }}
      <slot/>
    </span>
  </span>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-badge
|
*/
const NAME = 'yd-badge'
export default {
  name: NAME,

  components: {},

  props: {
    status: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>

<style lang="stylus">
@keyframes antStatusProcessing {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  to {
    transform: scale(2.4);
    opacity: 0;
  }
}

.yd-badge {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;

  &-status {
    &--success {
      background-color: var(--status-success);
    }
    &--error {
      background-color: var(--status-error);
    }
    &--default {
      background-color: var(--status-default);
    }
    &--primary {
      background-color: var(--color-primary);
    }
    &--processing {
      background-color: var(--status-processing);
      &:after {
        position: absolute;
        top: -1px;
        left: -2px;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #1890ff;
        content: '';
        animation: antStatusProcessing 1.2s infinite ease-in-out;
      }
    }
    &--warning {
      background-color: var(--status-warning);
    }
  }
  &__dot {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    position: relative;
  }
  &__text {
    color: rgba(0, 0, 0, 0.65);
    margin-left: 2px;
    font-size: 12px;
  }
}
</style>
