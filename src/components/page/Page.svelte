<script type="ts">
  export let centerItems: true | false = false;
</script>

<div class={`page ${centerItems ? "page-center" : ""}`}>
  <slot />
</div>
