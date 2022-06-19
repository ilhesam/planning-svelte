<script lang="ts">
  import { PageHeader, PageBody } from "$components";
  import { serviceOptions, TargetsService, type TargetResponse } from "$api";
  import { percent } from "$utils"
  import { onMount } from "svelte";
  import axios from "axios";

  let targets: TargetResponse[] = []

  onMount(async () => {
    serviceOptions.axios = axios.create({
      baseURL: 'http://localhost:13527'
    })
    var response = await TargetsService.search({ body: {
      parentIds: []
    }})
    console.log(response)
    targets = response.data ?? []
  })
</script>

<PageHeader>
  <div class="row g-2 align-items-center">
    <div class="col">
      <h1 class="page-title">Your Main Targets</h1>
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <a href="/plans" class="btn btn-dark">+ Add new target</a>
    </div>
  </div>
</PageHeader>

<PageBody>
  <div class="row">
    {#each targets as target}
    <div class="col-md-6 mt-3">
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">{target.mainTarget?.title}</h3>
          </div>
          <div class="card-actions">
            <a href="/targets" class="btn btn-light">+ Add new target</a>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush border-bottom">
            {#each target.subTargets ?? [] as subTarget}
              <div class="list-group-item">
                <div class="row align-items-center">
                  <div class="col text-truncate">
                    <a href="/targets/reading-books" class="text-reset d-block"
                      >{subTarget.title} - {subTarget.goal} {subTarget.metric}</a
                    >
                    <div class="d-block text-muted text-truncate mt-1">
                      {subTarget.description}
                    </div>
                    <div class="progress progress-xl mt-3">
                      <div
                        class="progress-bar"
                        style={`width: ${percent(subTarget.progress, subTarget.goal)}%`}
                        role="progressbar"
                      />
                    </div>
                    <div class="float-end mt-2">
                      {percent(subTarget.progress, subTarget.goal)}% - {subTarget.progress} {subTarget.metric}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div></PageBody
>
