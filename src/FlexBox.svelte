<script>
    export let title = ""
</script>
<div>
    <div class="border-box">
      <div class="header">{title}</div>
      <div class="flex-box">
        <slot>

        </slot>
      </div>  
    </div>
</div>      

<style>
    .header {
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      __font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      __font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      __font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      __font-family:Verdana, Geneva, Tahoma, sans-serif;
      __font-weight: bold;
      font-size: 14px;
    }
  
    .border-box {
      __border: solid 1px #999999; 
      background-color: #5F717B;
      border-radius: 6px; 
      padding: 4px; 
      margin-bottom: 6px;
      display: inline-block;
    }
  
    .flex-box {
      display: flex; 
      gap: 4px;
      flex-flow: row wrap;
    }
</style>  
