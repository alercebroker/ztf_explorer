<template>
	<div>
		<b-table striped hover :items="result" :fields="fields"></b-table>
	</div>
</template>

<script>

export default {
  name: 'tabData',
  props: ["result"],
	data(){
		return  {
            fields: [
				{
				  key: 'pclass',
				  sortable: true,
					label: 'PClass'
				},
				{
				  key: 'oid',
				  sortable: false,
					label: 'Object ID'
				},
				{
				  key: 'oid',
				  sortable: false,
					label: 'Object ID'
				},
				{
				  key: 'nobs',
				  sortable: false,
					label: '# Obs'
				}
			  ],
		    }
        },
}
</script>