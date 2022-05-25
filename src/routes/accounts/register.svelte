<script lang="ts">
    import {
      Card,
      CardTitle,
      CardBody,
      Form,
      FormInput,
      FormFooter,
      FormSubmit,
      Page,
    } from "$components";
  </script>
  
  <Page centerItems={true}>
    <div class="container-tight">
      <Card classes="py-4 px-2" size="md">
        <Form autoComplete={false}>
          <CardBody>
            <CardTitle classes="text-center mb-4">Create an account</CardTitle
            >
            <FormInput
              label="Username"
              inputType="email"
              inputPlaceholder="Enter your username..."
              autoComplete={false}
            />
            <FormInput
              label="Password"
              inputType="password"
              inputPlaceholder="Enter your password..."
              autoComplete={false}
            />
            <FormFooter>
              <FormSubmit text="Sign up" width={100} />
            </FormFooter>
          </CardBody>
        </Form>
      </Card>
      <div class="text-center text-muted mt-3">
        Alreay have an account? <a href="/accounts/login" tabindex="-1"
          >Sign in</a
        >
      </div>
    </div>
  </Page>
  