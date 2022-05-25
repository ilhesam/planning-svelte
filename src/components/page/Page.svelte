<script type="ts">
  export let centerItems: boolean = false;
</script>

<div class={`page ${centerItems ? "page-center" : ""}`}>
  <slot />
</div>
