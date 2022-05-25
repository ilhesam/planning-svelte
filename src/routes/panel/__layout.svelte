<script lang="ts">
  import { Page, Sidebar } from "$components";
</script>

<Page>
  <Sidebar />
  <div class="page-wrapper">
    <div class="container-xl">    
      <slot />
    </div>
  </div>
</Page>
