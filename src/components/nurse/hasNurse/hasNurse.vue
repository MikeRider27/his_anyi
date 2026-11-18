<template>
    <div class="nurse_table">
      <h1 class="listing-page-title">Enfermeros(as) registrados</h1>
      <!-- Existing nurses -->
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" class="filter-item nurse-filter-input" placeholder="Nombre" v-model="searchName">
        </el-input>
        <el-input @keyup.enter.native="handleFilter" class="filter-item nurse-filter-input" placeholder="Departamento" v-model="searchDepartment"></el-input>
        <!-- <el-select clearable class="filter-item" style="width: 130px" placeholder="Department" v-model="listQuery.department">
          <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
          </el-option>
        </el-select> -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handelSearch">Buscar</el-button>
        <el-button class="filter-item" @click="getAll">Mostrar todo</el-button>
        <el-button class="filter-item" type="primary" @click="handelCreate" icon="el-icon-plus">Añadir</el-button>
        <el-button class="filter-item" type="danger" @click="handleDelAll" icon="el-icon-delete">Eliminar todo</el-button>
        <el-button class="filter-item" icon="el-icon-document" @click="handleDownload">Exportar</el-button>
      </div>

      <el-table ref="multipleTable" :data="table" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand" width="52" class-name="nurse-expand-control">
        <template slot-scope="props">
          <div class="nurse-row-details">
            <div><strong>Dirección:</strong><span>{{ props.row.address }}</span></div>
            <div><strong>Cargo:</strong><span>{{ props.row.position }}</span></div>
            <div><strong>Formación:</strong><span>{{ props.row.education }}</span></div>
            <div><strong>Especialidad:</strong><span>{{ props.row.profession }}</span></div>
            <div><strong>Fecha de ingreso:</strong><span>{{ props.row.date }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="N.º" width="50">
      <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="department" label="Departamento" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="Sexo" width="90"></el-table-column>
      <el-table-column prop="age" label="Edad" sortable align="center" width="90"></el-table-column>
      <el-table-column align="center" label="Acciones" width="160" class-name="nurse-actions-column">
      <template slot-scope="scope">
        <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
      </template>
      </el-table-column>
      </el-table>

      <div class="selection-actions">
         <el-button size="small" @click="toggleSelection()">Cancelar selección</el-button>
      </div>

      <div class="pagination-container">
         <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"  :page-sizes="[7,10,20,30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="80">
         </el-pagination>
      </div>  
      <!-- Form for adding info -->
      <el-dialog title="Añadir información" :visible.sync="dialogFormVisible" custom-class="nurse-dialog app-dialog" append-to-body>
        <el-form class="small-space nurse-dialog-form" :model="form" label-position="top">
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Dirección">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="Edad">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="Cargo">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="Especialidad">
            <el-input v-model="form.profession"></el-input>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="Formación">
            <el-input v-model="form.education"></el-input>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
           <el-form-item label="Fecha de ingreso">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleCreateSubmit">Aceptar</el-button>
          <el-button type="primary" @click="resetForm('form')">Restablecer</el-button>
        </div>
      </el-dialog>
      <!-- Form for editing info -->
      <el-dialog title="Modificar datos personales" :visible.sync="dialogFormEditVisible" custom-class="nurse-dialog app-dialog" append-to-body>
        <el-form class="small-space nurse-dialog-form" :model="form" label-position="top">
          <el-form-item label="Nombre">
            <el-input v-model="tableEdit.name"></el-input>
          </el-form-item>
          <el-form-item label="Dirección">
            <el-input v-model="tableEdit.address"></el-input>
          </el-form-item>
          <el-form-item label="Edad">
            <el-input v-model="tableEdit.age"></el-input>
          </el-form-item>
          <el-form-item label="Cargo">
            <el-input v-model="tableEdit.position"></el-input>
          </el-form-item>
          <el-form-item label="Especialidad">
            <el-input v-model="tableEdit.profession"></el-input>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="tableEdit.department"></el-input>
          </el-form-item>
          <el-form-item label="Formación">
            <el-input v-model="tableEdit.education"></el-input>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-radio-group v-model="tableEdit.sex">
              <el-radio label="Hombre"></el-radio>
              <el-radio label="Mujer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Fecha de ingreso">
            <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="tableEdit.date"></el-date-picker>
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
      total: null,
      listLoading: true,
      listQuery: {
        currPage: 1,
        // pageSize: 10,
        name: '',
        type: ''
      },
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      },
      typeOptions: [
        {key: '001', display_name: 'Ginecología'},
        {key: '002', display_name: 'Pediatría'},
        {key: '003', display_name: 'Obstetricia'},
        {key: '004', display_name: 'Urgencias'},
        {key: '005', display_name: 'Psiquiatría'}
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // Edit
    handleEdit (index, row) {
      this.dialogFormEditVisible = true;
      // this.Index = index;
      // this.tableEdit = this.table[index];
      // this.tableEdit = JSON.parse(JSON.Stringify(this.index));
      this.tableEdit = row;
      // this.tableEdit = JSON.parse(JSON.Stringify(this.tableEdit.row));
    },
    // Edit form submission
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
        message: '¡Datos personales modificados correctamente!',
        type: 'success'
      });
    },
    // Delete one
    handleDelete (index, row) {
      let vm = this;
      vm.table.splice(index, 1);
      this.$message({
        message: '¡Eliminado correctamente!',
        type: 'success'
      });
    },
    // Delete all
    handleDelAll () {
      this.table = [];
    },
    // Add
    handelCreate () {
      this.dialogFormVisible = true;
      this.formClear();
    },
    // handleFilter () {
    //   // Namethis.getList();
    // },
    // Search
    handelSearch () {
      let intendedSearch = this;
      intendedSearch.$http.get(api.hasNurse, {params: {name: intendedSearch.searchName, department: intendedSearch.searchDepartment}}).then((response) => {
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
        const tHeader = ['Nombre', 'Dirección', 'Sexo', 'Edad', 'Cargo', 'Departamento', 'Formación', 'Especialidad', 'Fecha de ingreso'];
        const filterVal = ['name', 'address', 'sex', 'age', 'position', 'department', 'education', 'profession', 'date'];
        const table = vm.table;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, 'Lista de enfermerosexcel');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
    },
    handleCreateSubmit () {
      let vm = this;
      vm.table.push(vm.form);
      this.dialogFormVisible = false;
      this.$message({
        message: '¡Datos personales añadidos correctamente!',
        type: 'success'
      });
    },
    // Clear form
    formClear () {
      this.form = {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      };
    },
    // Reset
    resetForm () {
      this.form = {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      };
    }
  },
  created () {
    this.$http.get(api.hasNurse).then((response) => {             // mark
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
  .nurse_table
    padding:0 10px
    .filter-container
      margin-bottom:16px
      .nurse-filter-input
        width:200px
        flex:1 1 180px
        max-width:240px

    .nurse-actions-column
      .cell
        display:flex
        justify-content:center
        flex-wrap:wrap
        gap:6px

        .el-button + .el-button
          margin-left:0

    .nurse-expand-control
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

    .nurse-row-details
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

    .selection-actions
      margin-top:12px

    .pagination-container
      display:flex
      justify-content:flex-end
      margin-top:16px

  .nurse-dialog
    width:760px
    max-width:calc(100vw - 32px)

    .el-dialog__body
      max-height:calc(100vh - 180px)
      overflow-y:auto
      padding:20px 24px

    .nurse-dialog-form
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      column-gap:24px

      .el-form-item
        min-width:0
        margin-bottom:16px

      .el-form-item__label
        padding-bottom:6px
        line-height:1.4
        white-space:normal

      .el-input,
      .el-select,
      .el-date-editor
        width:100%

      .el-radio-group
        min-height:40px
        display:flex
        align-items:center

  @media (max-width: 700px)
    .nurse_table
      padding:0

      .nurse-row-details
        grid-template-columns:repeat(2, minmax(0, 1fr))

      .filter-container
        .nurse-filter-input
          max-width:none

      .pagination-container
        justify-content:flex-start
        overflow-x:auto

    .nurse-dialog
      width:calc(100vw - 24px)
      max-width:none
      margin:12px auto !important

      .el-dialog__body
        max-height:calc(100vh - 150px)
        padding:16px

      .nurse-dialog-form
        grid-template-columns:minmax(0, 1fr)
</style>
