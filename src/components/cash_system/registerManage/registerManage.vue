<template>
  <div class="registerManage">
    <h1 class="listing-page-title">Registros de citas</h1>
    <!-- Search criteria -->
    <div class="filter-container">
      <el-input class="register-filter-input" placeholder="Número de cita" v-model="searchNumber"></el-input>
      <el-input class="register-filter-input" placeholder="Nombre del paciente" v-model="searchName"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">Buscar</el-button>
      <el-button type="primary" icon="el-icon-view" @click="showAll">Mostrar todo</el-button>
      <el-button icon="el-icon-document" @click="handleDownload">Exportar</el-button>
    </div>
    <!-- Patient registration list -->
    <el-table :data="patients" stripe style="width: 100%; text-align:left">
      <el-table-column prop="number" label="N.º de cita" width="100"></el-table-column>
      <el-table-column prop="name" label="Nombre del paciente" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="" label="Documento de registro" min-width="115"></el-table-column>
      <el-table-column prop="" label="N.º de documento" min-width="115"></el-table-column>
      <el-table-column prop="disease" label="Departamento" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="doctor" label="Médico" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="Hora de consulta" min-width="125"></el-table-column>
      <el-table-column prop="" label="N.º de espera" min-width="100"></el-table-column>
      <el-table-column prop="" label="Tarifa de registro" min-width="110"></el-table-column>
      <el-table-column label="Acciones" width="160" align="center" class-name="register-actions-column">
        <template slot-scope="scope">
          <div class="row-actions">
            <el-button type="primary" size="mini" icon="el-icon-view" @click="checkDetail(scope.$index)">Ver</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteDetail(scope.$index,patients)">Eliminar</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- Click to view patient registration details -->
    <el-dialog title="Datos de la cita del paciente" :visible.sync="dialogVisible" :before-close="handleClose" custom-class="app-dialog" append-to-body>
      <ul class="patientsdetail">
        <li><h5>N.º de cita:</h5><span>{{patientsdetails.number}}</span></li>
        <li><h5>Nombre del paciente:</h5><span>{{patientsdetails.name}}</span></li>
        <li><h5>Documento de registro:</h5><span></span></li>
        <li><h5>N.º de documento:</h5><span></span></li>
        <li><h5>Sexo:</h5><span>{{patientsdetails.sex}}</span></li>
        <li><h5>Edad:</h5><span>{{patientsdetails.age}}</span></li>
        <li><h5>Dirección:</h5><span>{{patientsdetails.position}}</span></li>
        <li><h5>Departamento:</h5><span>{{patientsdetails.disease}}</span></li>
        <li><h5>Médico:</h5><span>{{patientsdetails.doctor}}</span></li>
        <li><h5>Hora de consulta:</h5><span>{{patientsdetails.date}}</span></li>
        <li><h5>N.º de espera:</h5><span></span></li>
        <li><h5>Tarifa de registro:</h5><span></span></li>
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
        patients: [],
        intendedpatients: [],
        dialogVisible: false,
        patientsdetails: '',
        searchNumber: '',
        searchName: ''
      };
    },
    mounted () {
      let registerThis = this;

      registerThis.$http.get(api.patientList).then((response) => {
        // Test statement, check whether data is fetchedresponse
        // Assign data fetched from the JSON API to the current object
        registerThis.patients = response.data.tableData;
        registerThis.intendedpatients = response.data.tableData;
      }, response => {
        // error callback
        this.$message({
          message: 'Error al solicitar los datos',
          type: 'error'
        });
      });
    },
    methods: {
      // Search
      search () {
        let search = this;
        search.$http.get(api.patientList, {params: {number: search.searchNumber, name: search.searchName}}).then((response) => {
          // Empty the array to hold the matching search results
          search.patients = [];
          // Iterate backend data for entries matching the parameter and push them intoprescriptionC[]
          for (let i = 0; i < response.data.tableData.length; i++) {
            // When both criteria have values, look for data matching both
            if (search.searchNumber && search.searchName) {
              if (response.data.tableData[i].number === search.searchNumber && response.data.tableData[i].name === search.searchName) {
                search.patients.push(response.data.tableData[i]);
              }
            } else {
              if (search.searchNumber && response.data.tableData[i].number === search.searchNumber) {
                // When only the first criterion has a value
                search.patients.push(response.data.tableData[i]);
              } else if (search.searchName && response.data.tableData[i].name === search.searchName) {
                // When only the second criterion has a value
                search.patients.push(response.data.tableData[i]);
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
        this.patients = this.intendedpatients;
        this.searchNumber = '';
        this.searchNamer = '';
      },
      // Confirm whether to closedialog
      handleClose (done) {
        this.$confirm('¿Confirmar cierre?').then(_ => {
          done();
        }).catch(_ => {});
      },
      // View patient details
      checkDetail (index) {
        this.dialogVisible = true;
        this.patientsdetails = this.patients[index];
      },
      deleteDetail (index, rows) {
        rows.splice(index, 1);
      },
      // Export the data table to Excel
      handleDownload () {
        var vm = this;

        import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
          const tHeader = ['N.º de cita', 'Nombre del paciente', 'Documento de registro', 'N.º de documento', 'Departamento', 'Médico', 'Hora de consulta', 'N.º de espera', 'Tarifa de registro'];
          const filterVal = ['number', 'name', '', '', 'disease', 'doctor', 'date', '', ''];
          const patients = vm.patients;
          const data = vm.formatJson(filterVal, patients);
          export_json_to_excel(tHeader, data, 'Lista de citas de pacientesexcel');
        });
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .registerManage
    .filter-container
      .register-filter-input
        width:200px
        flex:1 1 180px
        max-width:240px

    .register-actions-column
      .cell
        padding:8px

      .row-actions
        display:flex
        justify-content:center
        gap:6px

        .el-button + .el-button
          margin-left:0

    .patientsdetail
      h5
        display:inline-block
        width:140px
        line-height:30px
        font-weight:bold

  @media (max-width: 700px)
    .registerManage
      .filter-container
        .register-filter-input
          max-width:none
</style>
