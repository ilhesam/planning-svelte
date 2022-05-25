<script lang="ts">
  export let autoComplete: boolean = false;
</script>

<form autocomplete={autoComplete ? "on" : "off"}>
  <slot />
</form>
