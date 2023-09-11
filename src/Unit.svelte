<script>
    export let label = ""
</script>
<div style="border: solid 1px #333333; border-radius: 0px; ">
    <div style="display: flex; flex-flow: row wrap; gap: 0px;">
        <slot>

        </slot>
    </div>
    <div style="margin0px; background-color:#333333; color: #ffffff; text-align:center; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 13px;">{label}</div>
</div>