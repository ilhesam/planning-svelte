<script type="ts">
  export let autoComplete: true | false = false;
</script>

<form autocomplete={autoComplete ? "on" : "off"}>
    <slot />
</form>