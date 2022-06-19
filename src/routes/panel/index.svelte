<script lang="ts">
  import { PageHeader, PageBody } from "$components";
  import { serviceOptions, TargetsService, type Target } from "$api";
  import { onMount } from "svelte";
import axios from "axios";

  let targets: Target[] = []

  onMount(async () => {
    serviceOptions.axios = axios.create({
      baseURL: 'http://localhost:13527'
    })
    var response = await TargetsService.search({ body: {} })
    console.log(response)
    targets = response.data ?? []
  })
</script>

<PageHeader>
  <div class="row g-2 align-items-center">
    <div class="col">
      <div class="page-pretitle">Overview</div>
      <h1 class="page-title">Your Targets</h1>
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <a href="/plans" class="btn btn-dark">+ Add new target</a>
    </div>
  </div>
</PageHeader>

<PageBody>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">1401 Annual Plan</h3>
          </div>
          <div class="card-actions">
            <a href="/targets" class="btn btn-light">+ Add new target</a>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush border-bottom">
            {#each targets as target}
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col text-truncate">
                    <a href="/targets/reading-books" class="text-reset d-block"
                      >{target.title} - {target.goal} pages</a
                    >
                    <div class="d-block text-muted text-truncate mt-1">
                      {target.description}
                    </div>
                    <div class="progress progress-xl mt-3">
                      <div
                        class="progress-bar"
                        style="width: 38%"
                        role="progressbar"
                      />
                    </div>
                    <div class="float-end mt-2">
                      0% - {target.progress} pages
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div></PageBody
>
