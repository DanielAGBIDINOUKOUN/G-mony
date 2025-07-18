<!-- src/components/InstallPrompt.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const deferredPrompt = ref(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e

    showInstallPrompt()
  })
})

const showInstallPrompt = async () => {
  const result = await Swal.fire({
    title: '📲 Installer G-MONY ?',
    text: 'Ajoutez cette application à votre écran d’accueil pour un accès rapide.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Oui, installer',
    cancelButtonText: 'Plus tard',
    confirmButtonColor: '#0d9488',
  })

  if (result.isConfirmed && deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const choice = await deferredPrompt.value.userChoice

    if (choice.outcome === 'accepted') {
      Swal.fire('✅ Installée !', 'G-MONY a été ajoutée à votre appareil.', 'success')
    } else {
      Swal.fire('❌ Installation annulée', 'Vous pourrez l’installer plus tard.', 'info')
    }

    deferredPrompt.value = null
  }
}
</script>
