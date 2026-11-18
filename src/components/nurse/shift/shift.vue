<template>
  <div class="shift">
    <div class="title">
      <p>Cuadrante de guardias de enfermería del Hospital Anyi</p>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handelSearch" class="filter-item shift-filter-input" placeholder="Introduzca el nombre" v-model="searchName"></el-input>
      <el-input @keyup.enter.native="handelSearch" class="filter-item shift-filter-input" placeholder="Introduzca el departamento" v-model="searchDepartment"></el-input>
      <!-- <el-select clearable class="filter-item" style="width: 130px" placeholder="Department" v-model="searchDepartment">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handelSearch">Buscar</el-button>
      <el-button @click="getAll">Mostrar todo</el-button>
      <el-button class="filter-item" type="primary" @click="handelCreate" icon="el-icon-plus">Añadir</el-button>
      <el-button class="filter-item" type="danger" @click="handleDelAll" icon="el-icon-delete">Eliminar todo</el-button>
      <el-button class="filter-item" icon="el-icon-document" @click="handleDownload">Exportar</el-button>
    </div>

    <el-table v-if="table" :data="table" stripe class="shift-table" style="width: 100%">
    <el-table-column type="expand" width="52" class-name="shift-expand-control">
      <template slot-scope="props">
        <div class="shift-row-details">
          <div><strong>Sexo:</strong><span>{{ props.row.sex }}</span></div>
          <div><strong>Teléfono:</strong><span>{{ props.row.phone }}</span></div>
          <div><strong>Asistencia:</strong><span>{{ props.row.attendence }}</span></div>
          <div><strong>Firma:</strong><span>{{ props.row.signature }}</span></div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="N.º" width="56">
      <template slot-scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column prop="date" label="Fecha" min-width="120"></el-table-column>
    <el-table-column prop="time" label="Horario" min-width="180" show-overflow-tooltip></el-table-column>
    <el-table-column prop="name" label="Nombre" min-width="150" show-overflow-tooltip></el-table-column>
    <el-table-column prop="department" label="Departamento" min-width="150" show-overflow-tooltip></el-table-column>
    <el-table-column align="center" label="Acciones" width="180" class-name="shift-actions-column">
      <template slot-scope="scope">
        <div class="row-actions">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index)">Editar</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
 <!--  Add info form -->
  <el-dialog title="Añadir información" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Fecha">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
          <el-form-item label="Horario de guardia">
            <el-select v-model="form.time" placeholder="Seleccione el horario de guardia">
              <el-option label="Turno temprano 8:00-16:00" value="Turno temprano 8:00-16:00"></el-option>
              <el-option label="Turno de día 8:00-17:00" value="Turno de día 8:00-17:00"></el-option>
              <el-option label="Noche corta 16:00-24:00" value="Noche corta 16:00-24:00"></el-option>
              <el-option label="Noche larga 24:00-8:00" value="Noche larga 24:00-8:00"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-radio-group v-model="form.sex">
              <el-radio label="Hombre"></el-radio>
              <el-radio label="Mujer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="Teléfono">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="Responsable">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleCreateSubmit">Aceptar</el-button>
          <el-button type="primary" @click="resetForm('form')">Restablecer</el-button>
        </div>
      </el-dialog>
      <!-- Edit info form -->
      <el-dialog title="Modificar guardia" :visible.sync="dialogFormEditVisible" custom-class="app-dialog" append-to-body>
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="Nombre">
            <el-input v-model="tableEdit.name" placeholder="Obligatorio"></el-input>
          </el-form-item>
          <el-form-item label="Fecha">
            <el-input v-model="tableEdit.date" placeholder="Obligatorio"></el-input>
          </el-form-item>
          <el-form-item label="Horario de guardia">
            <el-select v-model="tableEdit.time" placeholder="Seleccione el horario de guardia">
              <el-option label="Turno temprano 8:00-16:00" value="Turno temprano 8:00-16:00"></el-option>
              <el-option label="Turno de día 8:00-17:00" value="Turno de día 8:00-17:00"></el-option>
              <el-option label="Noche corta 16:00-24:00" value="Noche corta 16:00-24:00"></el-option>
              <el-option label="Noche larga 24:00-8:00" value="Noche larga 24:00-8:00"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-radio-group v-model="tableEdit.sex">
              <el-radio label="Hombre"></el-radio>
              <el-radio label="Mujer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="tableEdit.department" placeholder="Obligatorio"></el-input>
          </el-form-item>
          <el-form-item label="Teléfono">
            <el-input v-model="tableEdit.phone" placeholder="Obligatorio"></el-input>
          </el-form-item>
          <el-form-item label="Asistencia">
            <el-select v-model="tableEdit.attendence" placeholder="Obligatorio">
              <el-option label="Trabajo" value="Trabajo"></el-option>
              <el-option label="Descanso" value="Descanso"></el-option>
              <el-option label="Permiso" value="Permiso"></el-option>
              <el-option label="Salida anticipada" value="Salida anticipada"></el-option>
              <el-option label="Retraso" value="Retraso"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Firma de la jefa de enfermería">
            <el-input v-model="tableEdit.signature" placeholder="Obligatorio"></el-input>
          </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleEditSubmit">Aceptar</el-button>
         </div>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table: [],
        tableEdit: [],
        searchList: [],
        searchName: '',
        searchDepartment: '',
        listQuery: {
          type: null
        },
        dialogFormVisible: false,
        dialogFormEditVisible: false,
        form: {
          name: '',
          date: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        },
        typeOptions: [
          {key: '001', display_name: 'Ginecología'},
          {key: '002', display_name: 'Pediatría'},
          {key: '003', display_name: 'Obstetricia'},
          {key: '004', display_name: 'Psiquiatría'},
          {key: '005', display_name: 'Urgencias'},
          {key: '006', display_name: 'Odontología'},
          {key: '007', display_name: 'Cirugía'},
          {key: '008', display_name: 'Medicina Interna'}
        ]
      };
    },
    methods: {
      // Edit
      handleEdit (index) {
        this.dialogFormEditVisible = true;
        this.Index = index;
        this.tableEdit = this.table[index];
      },
      handleEditSubmit (index) {
        this.dialogFormEditVisible = false;
        let oldDate = this.tableEdit.date;
        let year = new Date(oldDate).getFullYear();
        let month = new Date(oldDate).getMonth() + 1;
        let day = new Date(oldDate).getDate();
        let dateFormat = year + '-' + month + '-' + day;
        this.tableEdit.date = dateFormat;
        this.table[index] = this.tableEdit;
        this.$message({
          message: '¡Turno modificado correctamente!',
          type: 'success'
        });
      },
      // Search
      handelSearch () {
        let intendedSearch = this;
        intendedSearch.$http.get(api.table_shift, {params: {name: intendedSearch.searchName, department: intendedSearch.searchDepartment}}).then((response) => {
          intendedSearch.table = [];
          for (let i = 0; i < response.data.table.length; i++) {
            if (response.data.table[i].name === intendedSearch.searchName && response.data.table[i].department === intendedSearch.searchDepartment) {
              intendedSearch.table.push(response.data.table[i]);
            } else if (response.data.table[i].name === intendedSearch.searchName) {
              intendedSearch.table.push(response.data.table[i]);
            } else if (response.data.table[i].department === intendedSearch.searchDepartment) {
              intendedSearch.table.push(response.data.table[i]);
            }
          };
        }, response => {
            // error callback
          intendedSearch.$notify.error({
            message: 'Error al solicitar los datos'
          });
        });
      },
      // Show all
      getAll () {
        this.table = this.searchList;
        this.searchName = '';
      },
      // Export
      handleDownload () {
        var vm = this;
        import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
          const tHeader = ['Fecha', 'Franja horaria', 'Nombre', 'Sexo', 'Departamento', 'Teléfono', 'Asistencia', 'Firma de la jefa de enfermería'];
          const filterVal = ['date', 'time', 'name', 'sex', 'department', 'phone', 'attendence', 'signature'];
          const table = vm.table;
          const data = vm.formatJson(filterVal, table);
          export_json_to_excel(tHeader, data, 'Cuadrante de guardias de enfermería del Hospital Anyiexcel');
        });
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      // Delete
      handleDelete (index, row) {
        let vm = this;
        vm.table.splice(index, 1);
        this.$message({
          message: '¡Eliminado correctamente!',
          type: 'success'
        });
      },
      // Show all
      handleDelAll () {
        this.table = [];
      },
      // Add
      handelCreate () {
        this.dialogFormVisible = true;
        this.formClear();
      },
      // Add submission
      handleCreateSubmit () {
        let vm = this;
        vm.table.push(vm.form);
        this.dialogFormVisible = false;
        this.$message({
          message: '¡Turno añadido correctamente!',
          type: 'success'
        });
      },
      // Clear form
      formClear () {
        this.form = {
          name: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        };
      },
      // Reset form
      resetForm () {
        this.form = {
          name: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        };
      }
    },
    created () {
      this.$http.get(api.table_shift).then((response) => {             // mark
        this.table = response.body.table;
        this.searchList = response.body.table;
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
  .shift
    .title
      p
        margin:0 0 20px
        color:#263b4d
        font-size:22px
        font-weight:600
        line-height:1.35

    .filter-container
      margin-bottom:16px

      .shift-filter-input
        width:200px
        flex:1 1 180px
        max-width:240px

    .shift-actions-column
      .cell
        padding:6px

      .row-actions
        display:flex
        justify-content:center
        gap:4px

        .el-button + .el-button
          margin-left:0

    .shift-table
      width:100%

    .shift-expand-control
      .el-table__expand-icon
        width:24px
        height:24px
        border:1px solid #d5e0e7
        border-radius:50%
        color:#167d77
        transform:none

        .el-icon-arrow-right
          display:none

        &::before
          content:"+"
          font-size:18px
          font-weight:600
          line-height:20px

      .el-table__expand-icon--expanded::before
        content:"−"

    .shift-row-details
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:12px 20px
      padding:8px 20px

      > div
        display:flex
        flex-direction:column
        min-width:0
        gap:4px

      strong
        color:#40566a
        font-size:12px

      span
        overflow-wrap:anywhere
        color:#526779

  @media (max-width: 700px)
    .shift
      .shift-row-details
        grid-template-columns:repeat(2, minmax(0, 1fr))

      .filter-container
        .shift-filter-input
          max-width:none
</style>