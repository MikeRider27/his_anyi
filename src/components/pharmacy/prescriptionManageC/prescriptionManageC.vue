<template>
  <div class="prescriptionCManageC">
    <h1 class="listing-page-title">Recetas de medicina china</h1>
    <!-- Search criteria -->
    <div class="filter-container">
      <el-input placeholder="Número de receta" v-model="searchNumber"></el-input>
      <el-input placeholder="Nombre del paciente" v-model="searchName"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">Buscar</el-button>
      <el-button type="primary" icon="el-icon-view" @click="showAll">Mostrar todo</el-button>
    </div>    
    <el-table :data="prescriptionC" stripe style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="form-expand">
            <el-form-item label="Departamento:">
              <span>{{ props.row.disease }}</span>
            </el-form-item>
            <el-form-item label="Médico:">
              <span>{{ props.row.doctor }}</span>
            </el-form-item>
            <el-form-item label="Fecha de emisión:">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <hr class="hr">
            <el-form-item label="Diagnóstico clínico:" class="symptoms">
              <span>{{ props.row.symptoms }}</span>
            </el-form-item>
            <hr class="hr">
            <h5 class="prescriptionC-title">R</h5>
            <template>
              <el-table :data="props.row.prescription.drug" style="width: 80%; margin: 0 auto;">
                <el-table-column prop="sort" label="Categoría" width="100">
                </el-table-column>
                <el-table-column prop="drugname" label="Nombre del medicamento" width="200">
                </el-table-column>
                <el-table-column prop="quantity" label="Cantidad (uds./g)" width="180">
                </el-table-column>
                <el-table-column prop="usage" label="Posología" width="260">
                </el-table-column>                
              </el-table>
            </template>
            <el-form-item label="Observaciones:" class="Rp">
              <span>{{ props.row.prescription.tips }}</span>
            </el-form-item>                         
          </el-form> 
        </template>
      </el-table-column>
      <el-table-column label="Número" prop="number" min-width="110">
      </el-table-column>
      <el-table-column label="Nombre del paciente" prop="name" min-width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="Sexo" prop="sex" min-width="75">
      </el-table-column>
      <el-table-column label="Edad" prop="age" min-width="65">
      </el-table-column>
      <el-table-column label="Dirección" prop="position" min-width="170" show-overflow-tooltip>
      </el-table-column>    
      <el-table-column label="Contacto" prop="phone" min-width="115">
      </el-table-column>      
      <el-table-column label="Farmacéutico revisor" prop="pharmacist" min-width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="Acciones" width="220" align="center" class-name="prescription-actions-column">
        <template slot-scope="scope">
          <div class="row-actions">
            <el-button type="primary" size="mini" icon="el-icon-close" @click="refuseprescriptionC(scope.$index)">Rechazar receta</el-button>
            <el-button type="primary" size="mini" icon="el-icon-goods" @click="acceptprescriptionC(scope.$index)">Salida de medicamentos</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        prescriptionC: [],
        intendedprescription: [],
        drugs: [],
        searchNumber: '',
        searchName: ''
      };
    },
    mounted () {
      let prescriptionCThis = this;

      prescriptionCThis.$http.get(api.patientList).then((response) => {
        // Test statement, check whether data is fetchedresponse
        // Assign data fetched from the JSON API to the current object
        prescriptionCThis.prescriptionC = response.data.tableData;
        prescriptionCThis.intendedprescription = response.data.tableData;
      }, response => {
        // error callback
        prescriptionCThis.$notify.error({
          message: 'Error al solicitar los datos'
        });
      });
      prescriptionCThis.$http.get(api.drugs).then((response) => {
        // Assign data fetched from the JSON API to the current object
        prescriptionCThis.drugs = response.data.tableDataC;
      }, response => {
        // error callback
        prescriptionCThis.$notify.error({
          message: 'Error al solicitar los datos'
        });
      });
    },
    methods: {
      // Search
      search () {
        let search = this;
        search.$http.get(api.patientList, {params: {number: search.searchNumber, name: search.searchName}}).then((response) => {
          // Empty the array to hold the matching search results
          search.prescriptionC = [];
          // Iterate backend data for entries matching the parameter and push them intoprescriptionC[]
          for (let i = 0; i < response.data.tableData.length; i++) {
            // When both criteria have values, look for data matching both
            if (search.searchNumber && search.searchName) {
              if (response.data.tableData[i].number === search.searchNumber && response.data.tableData[i].name === search.searchName) {
                search.prescriptionC.push(response.data.tableData[i]);
              }
            } else {
              if (search.searchNumber && response.data.tableData[i].number === search.searchNumber) {
                // When only the first criterion has a value
                search.prescriptionC.push(response.data.tableData[i]);
              } else if (search.searchName && response.data.tableData[i].name === search.searchName) {
                // When only the second criterion has a value
                search.prescriptionC.push(response.data.tableData[i]);
              }
            }
          }
        }, (response) => {
          // error callback
          search.$notify.error({
            message: 'Error al solicitar los datos'
          });
        });
      },
      // Show all data
      showAll () {
        this.prescriptionC = this.intendedprescription;
        this.searchNumber = '';
        this.searchNamer = '';
      },
      // Reject prescription
      refuseprescriptionC: function (index) {
        // There should be an action here to notify the doctor that their prescription was rejected
        this.$message({
          message: 'Se ha notificado al médico ' + this.prescriptionC[index].doctor + ': ¡receta rechazada!',
          type: 'success'
        });
      },
      // Get the currently logged-in account name
      acceptprescriptionC: function (index) {
        // Here the logged-in account name should be fetched and assigned to this.prescriptionC[index].pharmacist, to know which reviewing pharmacist is acting
        // Here we pretend the logged-in account is “Tang Jing”; the name is hardcoded for now
        this.prescriptionC[index].pharmacist = sessionStorage.getItem('easeHis');
        this.$message({
          message: '¡Esta receta ya fue tramitada por el farmacéutico ' + this.prescriptionC[index].pharmacist + '!',
          type: 'success'
        });
        // mark!!! Iterate the array, compare drug names and update stock: stock - dispensed quantity
        for (let i = 0; i < this.drugs.length; i++) {
          for (let j = 0; j < this.prescriptionC[index].prescription.drug.length; j++) {
            if (this.drugs[i].drugname === this.prescriptionC[index].prescription.drug[j].drugname) {
              this.drugs[i].quantity = this.drugs[i].quantity - this.prescriptionC[index].prescription.drug[j].quantity;
              // Send data to the backend (no backend API yet); the backend replaces the original stock with the modified value, and every place using that stock is updated
              // this.$http.post('', {drugs: 'this.drugs'}).then(response => {}, response => {});
              // There is no backend API to return the modified stock, so the result is printed to the console
            };
          };
        };
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .prescriptionCManageC
    .filter-container
      .el-input
        width:200px
        flex:1 1 180px
        max-width:240px

    .prescription-actions-column
      .cell
        padding:10px

      .row-actions
        display:flex
        flex-direction:column
        align-items:stretch
        gap:6px

        .el-button
          width:100%
          margin:0

    .form-expand
      /* background: #99FF66 */
      width:80%
      margin: 0 auto
      .el-form-item
        width: 29%
        display: inline-block
        margin-left: 20px
      .symptoms
        width: 100%
      .Rp
        width: 80%
        margin-left: 10%
      .hr
        margin-top: -25px
        border-top: 1px solid #4A7C32
      .prescriptionC-title
        font-size: 26px
        margin-left: 20px
  .prescriptionCManageC .form-expand .el-form-item span
    display: block
    font-size: 15px
    font-weight: bold

</style>
