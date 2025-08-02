<script lang="ts">
  import { storage } from "$lib/states/storage.svelte";
  import CustomInput from "$lib/components/reusable/CustomInput.svelte";

  let settings = $state(storage.settings.get());

  $effect(() => {
    storage.settings.set(settings);
  });
</script>

<div class="class flex flex-col gap-2 text-gray-500 text-sm">
  <div class="flex items-center justify-between">
    <span>Set currency sign:</span>
    <CustomInput bind:value={settings.currency_sign} label="" placeholder="(unmanaged currency)" />
  </div>

  <button class="bg-red-500 text-white p-4 rounded font-bold">Clear data</button>
</div>
