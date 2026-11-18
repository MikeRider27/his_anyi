<template>
  <div class="drugInfosC">
    <h1 class="listing-page-title">Medicamentos de farmacia china</h1>
    <!-- Search criteria -->
    <div class="filter-container">
      <el-input class="medicine-search-input" placeholder="Medicamento" v-model="searchValue" @keyup.enter.native="search"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search()">Buscar</el-button>

      <el-button icon="el-icon-document" @click="handleDownload">Exportar</el-button>
      <el-button type="primary" icon="el-icon-view" @click="showAll">Mostrar todo</el-button>
    </div>
    <!-- Drug list -->
    <div class="medicine-table-scroll">
      <el-table :data="tableData" class="medicine-table" :fit="false" style="width: 100%; text-align:left">
        <el-table-column prop="index" label="N.º" width="72"></el-table-column>
        <el-table-column prop="type" label="Categoría" width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="drugname" label="Nombre del medicamento" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="OTC" label="OTC / Marca" width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specification" label="Presentación" width="155" show-overflow-tooltip></el-table-column>
        <el-table-column prop="form" label="Forma farmacéutica" width="155" show-overflow-tooltip></el-table-column>
        <el-table-column prop="expiry_date" label="Caduca el" width="115"></el-table-column>
        <el-table-column prop="vender" label="Fabricante" width="240" show-overflow-tooltip></el-table-column>
        <el-table-column prop="quantity" label="Stock (uds./g)" width="115"></el-table-column>
        <el-table-column prop="price" label="Precio unitario (yuanes)" width="165"></el-table-column>
        <el-table-column label="Acciones" width="90">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-view" @click="checkDetail(scope.$index)">Ver</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Click to view drug details -->
    <el-dialog title="Características del producto" :visible.sync="dialogVisible" :before-close="handleClose" custom-class="app-dialog" append-to-body>
      <ul class="drugdetail">
        <li><h5>Nombre del producto:</h5><span>{{drugdetails.productname}}</span></li>
        <li><h5>Forma farmacéutica:</h5><span>{{drugdetails.form}}</span></li>
        <li><h5>Dosis:</h5><span>{{drugdetails.use_quantity}}</span></li>
        <li><h5>Marca:</h5><span>{{drugdetails.brand}}</span></li>
        <li><h5>Tipo de envase:</h5><span>{{drugdetails.plantype}}</span></li>
        <li><h5>Caducidad:</h5><span>{{drugdetails.expiry}}</span></li>
        <li><h5>Posología:</h5><span>{{drugdetails.usage}}</span></li>
        <li><h5>Categoría:</h5><span>{{drugdetails.OTC}}</span></li>
        <li><h5>Nombre del medicamento:</h5><span>{{drugdetails.drugname}}</span></li>
        <li><h5>Denominación común:</h5><span>{{drugdetails.genericname}}</span></li>
        <li><h5>N.º de registro sanitario:</h5><span>{{drugdetails.certificate}}</span></li>
        <li><h5>Laboratorio fabricante:</h5><span>{{drugdetails.vender}}</span></li>
        <li><h5>Presentación: </h5><span>{{drugdetails.specification}}</span></li>
        <li><h5>Categoría: </h5><span>{{drugdetails.type}}</span></li>
      </ul>
      <h5 slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Aceptar</el-button>
      </h5>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        tableData: [],
        assistanttableData: [],
        dialogVisible: false,
        drugdetails: '',
        searchValue: ''
      };
    },
    mounted () {
      let druginfosThis = this;

      druginfosThis.$http.get(api.drugs).then((response) => {
        // Test statement, check whether data is fetchedresponse
        // Assign data fetched from the JSON API to the current object
        druginfosThis.tableData = response.data.tableDataC;
        druginfosThis.assistanttableData = response.data.tableDataC;
      }, response => {
        // error callback
        druginfosThis.$notify.error({
          message: 'Error al solicitar los datos'
        });
      });
    },
    methods: {
      // Confirm whether to closedialog
      handleClose (done) {
        this.$confirm('¿Confirmar cierre?').then(_ => {
          done();
        }).catch(_ => {});
      },
      // View drug detail parameters
      checkDetail (index) {
        this.dialogVisible = true;
        this.drugdetails = this.tableData[index];
      },
      // Search
      search () {
        let intendedSearch = this;
        intendedSearch.$http.get(api.drugs, {params: {drugname: intendedSearch.searchValue}}).then((response) => {
          // Iterate all API data, find entries matching the search box text and push them all into this.tableData
          // Clear this.tableData before storing the results
          intendedSearch.tableData = [];
          for (let i = 0; i < response.data.tableDataC.length; i++) {
            if (response.data.tableDataC[i].drugname === intendedSearch.searchValue) {
              intendedSearch.tableData.push(response.data.tableDataC[i]);
            }
          };
        }, response => {
          // error callback
          intendedSearch.$notify.error({
            message: 'Error al solicitar los datos'
          });
        });
      },
      // Show all data
      showAll () {
        this.tableData = this.assistanttableData;
        this.searchValue = '';
      },
      // Export the data table to Excel
      handleDownload () {
        var vm = this;

        import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
          const tHeader = ['N.º', 'Categoría', 'Nombre del medicamento', 'OTCMarca', 'Presentación', 'Forma farmacéutica', 'Fabricante', 'Stock (uds.)', 'Precio unitario (yuanes)'];
          const filterVal = ['index', 'type', 'drugname', 'OTC', 'specification', 'form', 'vender', 'quantity', 'price'];
          const tableData = vm.tableData;
          const data = vm.formatJson(filterVal, tableData);
          export_json_to_excel(tHeader, data, 'Lista de medicamentos de la farmaciaexcel');
        });
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .drugInfosC
    .filter-container
      .medicine-search-input
        width:320px
        flex:1 1 240px
        max-width:400px

    .medicine-table
      width:100%
      min-width:1537px

      .cell
        white-space:nowrap

    .medicine-table-scroll
      width:100%
      overflow-x:auto
      overflow-y:hidden
      -webkit-overflow-scrolling:touch

    .drugdetail
      h5
        display:inline-block
        width:100px
        line-height:30px
        font-weight:bold

  @media (max-width: 700px)
    .drugInfosC .filter-container .medicine-search-input
      max-width:none
</style>
