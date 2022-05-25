<script lang="ts">
  export let size: "sm" | "md" | "lg" | "xl" = "md";
  export let classes: String = "";
</script>

<div class={`card card-${size} ${classes}`}>
  <slot />
</div>
