<script type="ts">
    export let text: string = "Submit"
    export let width: 100 | 50 | "auto" = "auto";
</script>

<button type="submit" class={`btn btn-primary w-${width}`}>{text}</button>