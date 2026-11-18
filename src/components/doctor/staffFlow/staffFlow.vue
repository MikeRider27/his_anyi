<template>
    <div class="staffFlow">
      <h1 class="listing-page-title">Movimiento de personal médico</h1>
      <div class="replyBtn">
        <el-button class="filter-item" icon="el-icon-document" @click="handleDownload">Exportar</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">Añadir baja de personal</el-button>
      </div>
      <el-table :data="staffFlowlist" stripe style="width: 100%;">
        <!-- <el-table-column label="Staff turnover table" class="tittle"> -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Nombre">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="Sexo">
                  <span>{{ props.row.sex }}</span>
                </el-form-item>
                <el-form-item label="Formación">
                  <span>{{ props.row.degree }}</span>
                </el-form-item>
                <el-form-item label="Especialidad">
                  <span>{{ props.row.major }}</span>
                </el-form-item>
                <el-form-item label="Cargo">
                  <span>{{ props.row.profession }}</span>
                </el-form-item>
                <el-form-item label="Departamento">
                  <span>{{ props.row.office }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="Médico ID" prop="id" min-width="120"></el-table-column>
          <el-table-column label="Nombre del médico" prop="name" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="Fecha de ingreso" prop="date" min-width="130"></el-table-column>
          <el-table-column label="Fecha de baja" prop="leave" min-width="120"></el-table-column>
          <el-table-column label="Motivo de la baja" prop="reason" min-width="150" show-overflow-tooltip></el-table-column>
        <!-- </el-table-column> -->
      </el-table>
      <el-dialog title="Añadir movimiento de personal" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; padding-left:50px;'>
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Sexo">
            <el-radio-group v-model="form.sex">
              <el-radio label="Hombre"></el-radio>
              <el-radio label="Mujer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Formación">
            <el-input v-model="form.degree"></el-input>
          </el-form-item>
          <el-form-item label="Especialidad">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="Cargo">
            <el-input v-model="form.profession"></el-input>
          </el-form-item>
          <el-form-item label="Departamento">
            <el-input v-model="form.office"></el-input>
          </el-form-item>
          <el-form-item label="Médico ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
           <el-form-item label="Fecha de ingreso">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
           <el-form-item label="Fecha de baja">
            <el-input v-model="form.leave"></el-input>
          </el-form-item>
           <el-form-item label="Motivo de la baja">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleCreateSubmit">Aceptar</el-button>
          <el-button type="primary" @click="formClear">Restablecer</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          dialogFormVisible: false,
          staffFlowlist: [],
          form: {
            name: '',
            sex: '',
            degree: '',
            major: '',
            position: '',
            profession: '',
            office: '',
            id: '',
            date: '',
            leave: '',
            reason: ''
          }
        };
      },
      methods: {
        // Export table
        handleDownload () {
          // Export
          var vm = this;
          import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
            const tHeader = ['Médico ID', 'Nombre', 'Sexo', 'Fecha de ingreso', 'Fecha de baja', 'Motivo de la baja', 'Formación', 'Especialidad', 'Cargo', 'Departamento'];
            const filterVal = ['id', 'name', 'sex', 'date', 'leave', 'reason', 'degree', 'major', 'profession', 'office'];
            const staffFlowlist = vm.staffFlowlist;
            const data = vm.formatJson(filterVal, staffFlowlist);
            export_json_to_excel(tHeader, data, 'Lista de turnos de médicosexcel');
          });
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // Export table
        handleCreate () {
          this.dialogFormVisible = true;
          // this.formClear();
        },
        formClear () {
          this.form = {
            name: '',
            sex: '',
            degree: '',
            major: '',
            position: '',
            profession: '',
            office: '',
            id: '',
            date: '',
            leave: '',
            reason: ''
          };
        },
        handleCreateSubmit () {
          let vm = this;
          vm.staffFlowlist.push(vm.form);
          this.dialogFormVisible = false;
        }
      },
      created () {
        this.$http.get(api.staffFlow).then((response) => {
          // mark
          this.staffFlowlist = response.body.staffFlowlist;
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
  .staffFlow
    .replyBtn
      justify-content:flex-end
      margin-bottom:16px

    .demo-table-expand
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:8px 20px
      padding:8px 16px

      .el-form-item
        display:flex
        min-width:0
        margin:0

      .el-form-item__label
        width:auto !important
        color:#657b8d
        font-weight:600
        white-space:nowrap

      .el-form-item__content
        min-width:0
        overflow-wrap:anywhere

  @media (max-width: 700px)
    .staffFlow
      .demo-table-expand
        grid-template-columns:minmax(0, 1fr)
</style>
