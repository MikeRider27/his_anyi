<template>
  <div class="editDoctor">
    <h1 class="listing-page-title">Tabla de médicos</h1>
    <div class="search">
     <el-input class="doctor-search-input" placeholder="Nombre del médico" v-model="searchName" @keyup.enter.native="search"></el-input>
     <el-button  type="primary" icon="el-icon-search" @click="search">Buscar</el-button>
     <el-button @click="getAll">Mostrar todo</el-button>
     <el-button class="filter-item" icon="el-icon-document" @click="handleDownload">Exportar</el-button>
    </div>
    <!-- Table -->
    <el-table :data="doctorlist" stripe style="width: 100%;">
      <el-table-column prop="index" label="N.º" width="64">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="Sexo" min-width="80">
      </el-table-column>
      <el-table-column label="Fecha de ingreso" min-width="130">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column prop="degree" label="Formación" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="major" label="Especialidad" min-width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="profession" label="Cargo" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="office" label="Departamento" min-width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="Acciones" width="180" align="center" class-name="doctor-actions-column">
        <template slot-scope="scope">
          <div class="row-actions">
            <el-button @click.native.prevent="edictDoctor(scope.$index)" type="primary" size="mini" icon="el-icon-edit">Editar</el-button>
            <el-button @click.native.prevent="delectDoctor(scope.$index, doctorlist)" type="danger" size="mini" icon="el-icon-delete">Eliminar</el-button>
          </div>
        </template>
      </el-table-column>     
    </el-table>
    <!-- Table -->
    <!-- dialogDialog -->
    <el-dialog title="Modificar datos del médico" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
      <el-form>
        <el-form-item label="Nombre" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sexo"  :label-width="formLabelWidth">
          <el-radio class="radio" v-model="doctorlistedit.sex" label="Hombre">Hombre</el-radio>
          <el-radio class="radio" v-model="doctorlistedit.sex" label="Mujer">Mujer</el-radio>
        </el-form-item>
        <el-form-item label="Fecha de ingreso" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="doctorlistedit.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="Formación" :label-width="formLabelWidth">
          <el-select v-model="doctorlistedit.degree" placeholder="Seleccione" style="width: 100%;">
            <el-option label="Técnico superior" name="junior" value="Técnico superior"></el-option>
            <el-option label="Grado" name="undergraduate" value="Grado"></el-option>
            <el-option label="Posgrado" name="postgraduate" value="Posgrado"></el-option>
            <el-option label="Doctorado" name="doctor" value="Doctorado"></el-option>
            <el-option label="Máster" name="master" value="Máster"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Especialidad" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cargo"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.profession" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Departamento"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.office" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="updateDoctor">Aceptar</el-button>
      </div>
    </el-dialog>
    <!-- dialogDialog -->
    <div class="block">
      <span class="demonstration">Ajustar registros por página</span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          // Fetch JSON and store it in doctorlist
          doctorlist: [],
          // Stores edits made in the dialog
          doctorlistedit: [],
          // Stores results when searching for the same name
          searchList: [],
          searchName: '',
          dialogFormVisible: false,
          // Max length of form inputs
          formLabelWidth: '60px',
          // Store the current row index inIndex
          Index: '',
          currentPage: 5
        };
      },
      methods: {
        // Exports the table
        handleDownload () {
        // Export
          var vm = this;
          import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
            const tHeader = ['Nombre', 'Sexo', 'Fecha de ingreso', 'Formación', 'Especialidad', 'Cargo', 'Departamento'];
            const filterVal = ['name', 'sex', 'date', 'degree', 'major', 'profession', 'office'];
            const doctorlist = vm.doctorlist;
            const data = vm.formatJson(filterVal, doctorlist);
            export_json_to_excel(tHeader, data, 'Lista de médicosexcel');
          });
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // Export table
        // Search
        search () {
          let intendedSearch = this;
          intendedSearch.$http.get(api.doctor, {params: {name: intendedSearch.searchName}}).then((response) => {
              // Iterate all API data, find entries matching the search box text and push them all into this.tableData
              // Clear this.tableData before storing the results
            intendedSearch.doctorlist = [];
            for (let i = 0; i < response.data.doctorlist.length; i++) {
              if (response.data.doctorlist[i].name === intendedSearch.searchName) {
                intendedSearch.doctorlist.push(response.data.doctorlist[i]);
              }
            };
          }, response => {
            // error callback
            intendedSearch.$notify.error({
              message: 'Error al solicitar los datos'
            });
          });
        },
        // Search
        // Show all
        getAll () {
          this.doctorlist = this.searchList;
        },
        // Runs when the Edit button is clicked
        edictDoctor (index) {
          this.dialogFormVisible = true;
          this.Index = index;             // Store the current row index
          this.doctorlistedit = this.doctorlist[index];  // Get the current row data
          // Date before editing
        },
        // Runs when the Delete button is clicked
        delectDoctor (index, rows) {
          rows.splice(index, 1);    // 1Number of rows to delete starting at the current one
        },
        updateDoctor () {
          this.dialogFormVisible = false;
          // Edited date, not yet formatted
          // Convert date format
          let year = this.doctorlistedit.date.getFullYear();
          let month = this.doctorlistedit.date.getMonth() + 1;
          let day = this.doctorlistedit.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          this.doctorlistedit.date = dateFormat;
          // this.$http.get(api.doctor, this.doctorlistedit).then(function () {
          this.doctorlist[this.Index] = this.doctorlistedit;
          // this.doctorlist[this.Index].date = dateFormat;
          this.$message({
            message: 'Datos del médico modificados correctamente',
            type: 'success'
          });
          // }, function () {
          //   this.$message.error('Failed to update doctor info');
          // });
        },
        handleSizeChange (val) {
        },
        handleCurrentChange (val) {
        }
      },
      created () {
        this.$http.get(api.doctor).then((response) => {             // mark
          this.doctorlist = response.body.doctorlist;
          this.searchList = response.body.doctorlist;
        }, response => {
          // error callback
          this.$message({
            message: 'Error al solicitar los datos',
            type: 'error'
          });
        });
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .editDoctor
    .search
      margin-bottom:16px

      .doctor-search-input
        width:200px
        flex:1 1 180px
        max-width:260px

    .doctor-actions-column
      .cell
        padding:8px

      .row-actions
        display:flex
        justify-content:center
        gap:4px

        .el-button + .el-button
          margin-left:0

    .block
      display:flex
      flex-wrap:wrap
      align-items:center
      justify-content:flex-end
      gap:12px
      margin-top:16px

  @media (max-width: 700px)
    .editDoctor
      .search
        .doctor-search-input
          max-width:none

      .block
        justify-content:flex-start
</style>
