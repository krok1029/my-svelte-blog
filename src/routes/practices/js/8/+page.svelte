<script lang="ts">
    document.getElementById('share-button')?.addEventListener('click', async () => {
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'title',
                    text: 'text',
                    url: 'https://omo.cyberbiz.io'
                });
                console.log('分享成功');
            } catch (error) {
                console.error('分享失敗', error);
            }
        } else {
            alert('Web Share API 不支援在這個瀏覽器上運行');
            console.log('Web Share API 不支援在這個瀏覽器上運行');
        }
    });
</script>

<button id="share-button">分享</button>
