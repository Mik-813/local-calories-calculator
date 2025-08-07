<script lang="ts">
  import { storage } from "$lib/states/storage.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import ImportIcon from "$lib/icons/ExportIcon.svelte";
  import ExportIcon from "$lib/icons/ImportIcon.svelte";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";
  import Modal from "$lib/components/reusable/Modal.svelte";
  import Settings from "$lib/components/Settings.svelte";

  let isSidebarOpen = $state(false);
  let isSettingsOpen = $state(false);

  function exportToCSV() {
    const csv = storage.persistentProducts
      .get()
      .map((p) => Object.values(p).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFromCSV() {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = ".csv";
    input.style.display = "none";
    input.addEventListener("change", (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== "string") return;

        const lines = (reader.result as string).split("\n").filter(Boolean);
        const products = lines.map((line) => {
          const [consumption_g, kcal_100g, price, title, weight] =
            line.split(",");
          return {
            consumption_g: Number(consumption_g),
            kcal_100g: Number(kcal_100g),
            price: Number(price),
            title,
            weight: Number(weight),
          } as Product;
        });
        storage.persistentProducts.set(products);
      };
      reader.readAsText(file);
    });
    input.click();
    input.remove();
  }
</script>

<header
  class="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white p-4"
>
  <div class="flex items-center justify-between">
    <h1 class="text-xl font-bold tracking-tight">Calories Calculator</h1>

    <button
      onclick={() => (isSidebarOpen = true)}
      class="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
      aria-label="Open menu"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </button>
  </div>
  <Sidebar
    bind:sidebarOpen={isSidebarOpen}
    items={[
      {
        title: "Import",
        description: "Import food data",
        className: "bg-blue-500",
        Icon: ImportIcon,
        onClick: importFromCSV,
      },
      {
        title: "Export",
        description: "Export food data",
        className: "bg-green-500",
        Icon: ExportIcon,
        onClick: exportToCSV,
      },
      {
        title: "Settings",
        description: "Configure application",
        className: "bg-orange-500",
        Icon: SettingsIcon,
        onClick: () => {
          isSettingsOpen = true;
        },
      },
    ]}
  />
  <Modal bind:visible={isSettingsOpen} title="Settings">
    {#snippet content()}
      <Settings />
    {/snippet}
  </Modal>
</header>
