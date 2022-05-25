<script type="ts">
  export let label: string = "";
  export let inputType: "text" | "email" | "password" = "text";
  export let inputPlaceholder: string = "";
  export let autoComplete: boolean = false;
</script>

<div class="form-group mb-3">
  <label class="form-label" for="">{label}</label>
  <input
    type={inputType}
    class="form-control"
    placeholder={inputPlaceholder}
    autocomplete={autoComplete ? "on" : "off"}
  />
</div>
