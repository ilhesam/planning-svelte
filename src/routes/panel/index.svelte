<script lang="ts">
  import { PageHeader, PageBody } from "$components";
  import { serviceOptions, TargetsService, type Target, type TargetRequest, type TargetResponse } from "$api";
  import { formatDate, percent, remainDays } from "$utils"
  import { onMount } from "svelte";
  import axios from "axios";
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores'

  let currentTargetId: string = $page.url.searchParams.get('target')
  let currentTarget: Target = undefined
  let targets: TargetResponse[] = []
  let targetRequest: TargetRequest = { parentId: currentTargetId, timeline: {}, metric: currentTarget?.metric, type: 1, priority: 0 }
  let targetModalState: 'add' | 'edit'  

  onMount(async () => {    
    serviceOptions.axios = axios.create({
      baseURL: 'http://localhost:13527'
    })
    await loadTargets()
  })

  const onAddTarget = async () => {
    await TargetsService.create({ body: targetRequest })
    await loadTargets()
    resetCurrentTarget()
  }

  const onEditTarget = async () => {
    await TargetsService.update({ body: targetRequest })
    await loadTargets()
    resetCurrentTarget()
  }

  const onDeleteTarget = async () => {
    await TargetsService.delete({ body: { id: targetRequest.id } })
    resetCurrentTarget()
    await loadTargets()
  }

  const onChangeTargetProgress = async (target: Target, progress: number) => {
    target.progress = progress
    await TargetsService.update({ body: target })
    await loadTargets()
  }

  const onCompleteTargetProgress = async (target: Target) => {
    await onChangeTargetProgress(target, target.progress === target.goal ? 0 : target.goal)
  }

  const onChangeTargetRequestTitle = () => {
    var matches = targetRequest.title.match(/(\d+)/)
    if (matches) targetRequest.goal = parseInt(matches[0])

    targetRequest.description = `I have to ${targetRequest.title.toLowerCase()}.`
  }

  const onOpenAddTargetModal = async (parentId: string) => {
    targetModalState = 'add'
    resetCurrentTarget()
    var parent = await TargetsService.getById({ body: { id: parentId } })
    targetRequest.parentId = parentId
    targetRequest.metric = parent.data.metric
    targetRequest.timeline = parent.data.timeline
  }

  const onOpenEditTargetModal = async (targetId: string) => {
    targetModalState = 'edit'
    var response = await TargetsService.getById({ body: { id: targetId } })
    targetRequest = response.data
  }

  const onOpenDeleteTargetModal = (targetId: string) => {
    targetRequest.id = targetId
  }

  const onClickTarget = async (targetId: string) => {
    currentTargetId = targetId
    await loadTargets()
  }

  const resetCurrentTarget = () => {
     targetRequest = { parentId: currentTargetId, timeline: {}, metric: currentTarget?.metric, type: 1, priority: 0 }
  }

  const loadTargets = async () => {
    if (currentTargetId) {
      var getByIdResponse = await TargetsService.getById({ body: { id: currentTargetId } })
      currentTarget = getByIdResponse.data
    }
    else {
      currentTarget = undefined
    }

    var response = await TargetsService.search({ body: {
      parentIds: [ currentTargetId ]
    }})
    targets = response.data ?? []
  }
</script>

<PageHeader>
  <div class="row g-2 align-items-center">
    <div class="col">
      {#if currentTarget}
        <div class="page-pretitle">
          <a href="/panel" on:click={async () => await onClickTarget(undefined)}
            ><Icon icon="eva:arrow-back-fill" /> Back</a
          >
        </div>
        <h1 class="page-title">{currentTarget.title}</h1>
      {:else}
        <div class="page-pretitle">Home Page</div>
        <h1 class="page-title">Your targets</h1>
      {/if}
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <a
        href="/"
        class="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#modal-team"
        on:click={() => onOpenAddTargetModal(null)}>+ Add new target</a
      >
    </div>
  </div>
</PageHeader>

<PageBody>
  <div class="row">
    <div class="modal modal-blur fade" id="modal-danger" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <div class="modal-status bg-danger" />
          <div class="modal-body text-center py-4">
            <Icon
              class="text-danger my-2"
              icon="jam:triangle-danger"
              width="55"
            />
            <h3>Are you sure?</h3>
            <div class="text-muted">
              Do you really want to remove this target with all sub-targets?
            </div>
          </div>
          <div class="modal-footer">
            <div class="w-100">
              <div class="row">
                <div class="col">
                  <button class="btn w-100" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col">
                  <button
                    class="btn btn-danger w-100"
                    data-bs-dismiss="modal"
                    on:click={onDeleteTarget}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            {#if targetModalState === "add"}
              <h5 class="modal-title">Add a new target</h5>
            {:else}
              <h5 class="modal-title">Edit target</h5>
            {/if}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <form>
              <div class="btn-group w-100 my-2">
                {#if targetRequest.type === 0}
                  <button
                    type="button"
                    on:click={() => (targetRequest.type = 0)}
                    class="btn btn-dark">Collection</button
                  >
                  <button
                    type="button"
                    on:click={() => (targetRequest.type = 1)}
                    class="btn">Single</button
                  >
                {:else}
                  <button
                    type="button"
                    on:click={() => (targetRequest.type = 0)}
                    class="btn">Collection</button
                  >
                  <button
                    type="button"
                    on:click={() => (targetRequest.type = 1)}
                    class="btn btn-dark">Single</button
                  >
                {/if}
              </div>
              <div class="form-group my-3">
                <label class="form-label" for="">Title</label>
                <input
                  bind:value={targetRequest.title}
                  on:change={() => onChangeTargetRequestTitle()}
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
                    bind:value={targetRequest.timeline.from}
                  />
                </div>
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">To</label>
                  <input
                    class="form-control"
                    type="date"
                    bind:value={targetRequest.timeline.to}
                  />
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="">Description</label>
                <input
                  bind:value={targetRequest.description}
                  type="text"
                  class="form-control"
                  placeholder="I have to read 2000 pages of technical books."
                />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="">Priority</label>
                <input
                  bind:value={targetRequest.priority}
                  type="number"
                  class="form-control"
                  placeholder="Default: 0"
                />
              </div>
              <div class="form-group row">
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">Goal</label>
                  <input
                    bind:value={targetRequest.goal}
                    type="text"
                    class="form-control"
                    placeholder="2000"
                  />
                </div>
                <div class="form-group mb-3 col-6">
                  <label class="form-label" for="">Metric</label>
                  <input
                    bind:value={targetRequest.metric}
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
            {#if targetModalState === "add"}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                on:click={onAddTarget}>Add Target</button
              >
            {:else}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                on:click={onEditTarget}>Edit Target</button
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#each targets as target}
      <div class="col-md-6 mt-3">
        {#if target.mainTarget.type === 0}
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">{target.mainTarget?.title}</h3>
              </div>
              <div class="card-actions">
                <a
                  href="/targets"
                  class="btn btn-action text-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-team"
                  on:click={() => onOpenAddTargetModal(target.mainTarget.id)}
                  ><Icon icon="carbon:calendar-add" width="22" /></a
                >
                <a
                  href="/targets"
                  class="btn btn-action text-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-team"
                  on:click={async () =>
                    await onOpenEditTargetModal(target.mainTarget.id)}
                  ><Icon icon="akar-icons:edit" width="22" /></a
                >
                <a
                  href="/targets"
                  class="btn btn-action text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-danger"
                  on:click={async () =>
                    await onOpenDeleteTargetModal(target.mainTarget.id)}
                  ><Icon icon="ant-design:delete" width="22" /></a
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="list-group list-group-flush border-bottom">
                {#each target.subTargets ?? [] as subTarget}
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col text-truncate">
                        <div class="clearfix">
                          <div class="float-start">
                            <a
                              href={`?target=${subTarget.id}`}
                              on:click={async () =>
                                await onClickTarget(subTarget.id)}
                              class="text-reset d-block"
                              >{subTarget.title} - {subTarget.goal}
                              {subTarget.metric}</a
                            >
                          </div>
                          <div class="float-end card-actions">
                            <a
                              href="/panel"
                              class="btn btn-action text-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#modal-team"
                              on:click={async () =>
                                await onOpenEditTargetModal(subTarget.id)}
                              ><Icon icon="akar-icons:edit" width="22" /></a
                            >
                            <a
                              href="/panel"
                              class="btn btn-action text-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#modal-danger"
                              on:click={async () =>
                                await onOpenDeleteTargetModal(subTarget.id)}
                              ><Icon icon="ant-design:delete" width="22" /></a
                            >
                          </div>
                        </div>
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
                        <div class="mt-2">
                          <div class="float-start">
                            <span class="me-2"
                              >{remainDays(subTarget.timeline.to)} days remaining</span
                            >
                            <i class="text-secondary"
                              >{formatDate(subTarget.timeline.from)} to {formatDate(
                                subTarget.timeline.to
                              )}</i
                            >
                          </div>
                          <div class="float-end">
                            {percent(subTarget.progress, subTarget.goal)}% - {subTarget.progress}
                            {subTarget.metric}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            <div class="card-footer">
              <div class="d-block text-muted text-truncate mt-2">
                {target.mainTarget.description}
              </div>
              <div>
                <div class="progress progress-xl mt-3">
                  <div
                    class="progress-bar"
                    style={`width: ${percent(
                      target.mainTarget.progress,
                      target.mainTarget.goal
                    )}%`}
                    role="progressbar"
                  />
                </div>
                <div class="mt-2">
                  <p class="float-start">
                    <span class="me-2"
                      >{remainDays(target.mainTarget.timeline.to)} days remaining</span
                    >
                    <i class="text-secondary"
                      >{formatDate(target.mainTarget.timeline.from)} to {formatDate(
                        target.mainTarget.timeline.to
                      )}</i
                    >
                  </p>
                  <div class="float-end">
                    {percent(
                      target.mainTarget.progress,
                      target.mainTarget.goal
                    )}% - {target.mainTarget.progress}
                    {target.mainTarget.metric}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div>
            <label class="form-selectgroup-item flex-fill">
              <input
                type="checkbox"
                class="form-selectgroup-input"
                checked={target.mainTarget.progress === target.mainTarget.goal}
                on:change={async () =>
                  onCompleteTargetProgress(target.mainTarget)}
              />
              <div
                class="form-selectgroup-label p-3"
                style="text-align: left !important;"
              >
                <div>
                  <div class="clearfix">
                    <div class="float-start">
                      <div>
                        <span class="form-selectgroup-check text-left me-2" />
                        {target.mainTarget.title} - {target.mainTarget.goal}
                        {target.mainTarget.metric}
                      </div>
                    </div>
                    {#if target.mainTarget.progress === 0}
                      <div class="float-end card-actions">
                        <a
                          href="/panel"
                          class="btn btn-action text-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-team"
                          on:click={async () =>
                            await onOpenEditTargetModal(target.mainTarget.id)}
                          ><Icon icon="akar-icons:edit" width="22" /></a
                        >
                        <a
                          href="/panel"
                          class="btn btn-action text-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-danger"
                          on:click={async () =>
                            onOpenDeleteTargetModal(target.mainTarget.id)}
                          ><Icon icon="ant-design:delete" width="22" /></a
                        >
                      </div>
                    {/if}
                  </div>
                  <div class="clearfix mt-3">
                    <div class="float-start">
                      {target.mainTarget.description}
                    </div>
                    <div class="float-end">
                      {remainDays(target.mainTarget.timeline.to)} days remaining
                    </div>
                  </div>
                  <div class="mt-3 clearfix">
                    <input
                      type="range"
                      class="form-range mb-2"
                      min={0}
                      max={target.mainTarget.goal}
                      step="1"
                      value={target.mainTarget.progress}
                      on:change={async (e) => await onChangeTargetProgress(target.mainTarget, e.target.value)}
                    />
                    <div class="float-end">
                      {percent(
                        target.mainTarget.progress,
                        target.mainTarget.goal
                      )}% - {target.mainTarget.progress}
                      {target.mainTarget.metric}
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        {/if}
      </div>
    {/each}

    {#if currentTarget}
      <div class="row align-items-center mt-3">
        <div class="col-6">
          <div>{currentTarget.description}</div>
        </div>
        <div class="col-6">
          <div>
            <div class="progress progress-xl mt-3">
              <div
                class="progress-bar"
                style={`width: ${percent(
                  currentTarget.progress,
                  currentTarget.goal
                )}%`}
                role="progressbar"
              />
            </div>
            <div class="mt-2">
              <p class="float-start">
                {remainDays(currentTarget.timeline.to)} days remaining
              </p>
              <div class="float-end">
                {percent(currentTarget.progress, currentTarget.goal)}% - {currentTarget.progress}
                {currentTarget.metric}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div></PageBody
>
