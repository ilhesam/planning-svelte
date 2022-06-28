<script lang="ts">
  import { PageHeader, PageBody } from "$components";
  import { serviceOptions, TargetsService, type TargetRequest, type TargetResponse } from "$api";
  import { percent } from "$utils"
  import { onMount } from "svelte";
  import axios from "axios";

  let targets: TargetResponse[] = []
  let newTarget: TargetRequest = { timeline: {} }

  onMount(async () => {
    serviceOptions.axios = axios.create({
      baseURL: 'http://localhost:13527'
    })

    await loadTargets()
  })

  const onAddTarget = async () => {
    await TargetsService.create({ body: newTarget })
    await loadTargets()
    newTarget = {}
  }

  const onOpenAddTargetModal = (parentId: string) => {
    newTarget.parentId = parentId
  }

  const loadTargets = async () => {
    var response = await TargetsService.search({ body: {
      parentIds: []
    }})
    targets = response.data ?? []
  }
</script>

<PageHeader>
  <div class="row g-2 align-items-center">
    <div class="col">
      <h1 class="page-title">Your Main Targets</h1>
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <a
        href="/plans"
        class="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#modal-team"
        on:click={onOpenAddTargetModal(null)}>+ Add new target</a
      >
    </div>
  </div>
</PageHeader>

<PageBody>
  <div class="row">
    <div
      class="modal modal-blur fade"
      id="modal-team"
      tabindex="-1"
      style="display: none;"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a new target</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group mb-3">
                <label class="form-label" for="">Title</label>
                <input
                  bind:value={newTarget.title}
                  type="text"
                  class="form-control"
                  placeholder="Read 2000 pages of technical books"
                />
              </div>
              <div class="form-group row">
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">From</label>
                  <input
                    class="form-control"
                    type="date"
                    bind:value={newTarget.timeline.from}
                  />
                </div>
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">To</label>
                  <input
                    class="form-control"
                    type="date"
                    bind:value={newTarget.timeline.to}
                  />
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="">Description</label>
                <input
                  bind:value={newTarget.description}
                  type="text"
                  class="form-control"
                  placeholder="I have to read 2000 pages of technical books."
                />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="">Priority</label>
                <input
                  bind:value={newTarget.priority}
                  type="number"
                  class="form-control"
                  placeholder="Default: 0"
                />
              </div>
              <div class="form-group row">
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">Goal</label>
                  <input
                    bind:value={newTarget.goal}
                    type="text"
                    class="form-control"
                    placeholder="2000"
                  />
                </div>
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">Metric</label>
                  <input
                    bind:value={newTarget.metric}
                    type="text"
                    class="form-control"
                    placeholder="pages"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal"
              >Close</button
            >
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              on:click={onAddTarget}>Add Target</button
            >
          </div>
        </div>
      </div>
    </div>
    {#each targets as target}
      <div class="col-md-6 mt-3">
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">{target.mainTarget?.title}</h3>
            </div>
            <div class="card-actions">
              <a
                href="/targets"
                class="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#modal-team"
                on:click={onOpenAddTargetModal(target.mainTarget.id)}
                >+ Add new target</a
              >
            </div>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush border-bottom">
              {#each target.subTargets ?? [] as subTarget}
                <div class="list-group-item">
                  <div class="row align-items-center">
                    <div class="col text-truncate">
                      <a
                        href="/targets/reading-books"
                        class="text-reset d-block"
                        >{subTarget.title} - {subTarget.goal}
                        {subTarget.metric}</a
                      >
                      <div class="d-block text-muted text-truncate mt-1">
                        {subTarget.description}
                      </div>
                      <div class="progress progress-xl mt-3">
                        <div
                          class="progress-bar"
                          style={`width: ${percent(
                            subTarget.progress,
                            subTarget.goal
                          )}%`}
                          role="progressbar"
                        />
                      </div>
                      <div class="float-end mt-2">
                        {percent(subTarget.progress, subTarget.goal)}% - {subTarget.progress}
                        {subTarget.metric}
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
