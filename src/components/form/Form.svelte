<script type="ts">
  export let autoComplete: boolean = false;
</script>

<form autocomplete={autoComplete ? "on" : "off"}>
  <slot />
</form>
