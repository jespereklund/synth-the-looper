<script>
    export let title = ""
</script>
<div>
    <div class="module-box">
      <div class="module-header">{title}</div>
      <div class="grid12-box">
        <slot>

        </slot>
      </div>
    </div>
</div>
<style>
  .module-header {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    __font-family:Verdana, Geneva, Tahoma, sans-serif;
    __font-weight: bold;
    font-size: 14px;
  }

  .module-box {
    __border: solid 1px #999999; 
    background-color: #5F717B;
    border-radius: 6px; 
    padding: 4px; 
    display: inline-block;
  }

  .grid12-box {
    display: grid;
    gap: 4px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
</style>