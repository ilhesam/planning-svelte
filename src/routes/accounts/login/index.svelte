<script type="ts">
  import Card from "../../../components/card/Card.svelte";
  import CardTitle from "../../../components/card/CardTitle.svelte";
  import CardBody from "../../../components/card/CardBody.svelte";
  import Form from "../../../components/form/Form.svelte";
  import FormInput from "../../../components/form/FormInput.svelte";
  import FormFooter from "../../../components/form/FormFooter.svelte";
  import FormSubmit from "../../../components/form/FormSubmit.svelte";
  import Page from "../../../components/page/Page.svelte";
</script>

<Page centerItems={true}>
  <div class="container-tight">
    <Card classes="py-4 px-2" size="md">
      <Form autoComplete={false}>
        <CardBody>
          <CardTitle classes="text-center mb-4">Login to your account</CardTitle
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
            <FormSubmit text="Sign in" width={100} />
          </FormFooter>
        </CardBody>
      </Form>
    </Card>
    <div class="text-center text-muted mt-3">
      Don't have account yet? <a href="/accounts/register" tabindex="-1">Sign up</a>
    </div>
  </div>
</Page>
