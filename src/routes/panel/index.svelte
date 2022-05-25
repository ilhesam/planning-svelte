<script lang="ts">
  import { PageHeader, PageBody } from "$components";
</script>

<PageHeader>
  <div class="row g-2 align-items-center">
    <div class="col">
      <div class="page-pretitle">Overview</div>
      <h1 class="page-title">Plans</h1>
    </div>
    <div class="col-12 col-md-auto ms-auto d-print-none">
      <a href="/plans" class="btn btn-primary">+ Add new plan</a>
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
            <a href="/targets" class="btn btn-primary">+ Add new target</a>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col text-truncate">
                  <a href="/targets/reading-books" class="text-reset d-block"
                    >Reading Books</a
                  >
                  <div class="d-block text-muted text-truncate mt-n1">
                    at least 3000 pages (about 10 pages daily)
                  </div>
                  <div class="progress progress-sm card-progress mt-2">
                    <div
                      class="progress-bar"
                      style="width: 38%"
                      role="progressbar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="list-group list-group-flush">
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col text-truncate">
                  <a
                    href="/targets/listening-podcasts"
                    class="text-reset d-block">Listening Podcasts</a
                  >
                  <div class="d-block text-muted text-truncate mt-n1">
                    at least 3650 minutes (about 10 minutes daily)
                  </div>
                  <div class="progress progress-sm card-progress mt-2">
                    <div
                      class="progress-bar"
                      style="width: 50%"
                      role="progressbar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></PageBody
>
