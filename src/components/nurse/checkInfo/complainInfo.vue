<template>
  <div class="checkInfo">
    <h1 class="listing-page-title">Foro del Hospital Anyi</h1>

    <el-table :data="table" stripe style="width: 100%">
    <el-table-column label="N.º" width="64">
      <template slot-scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column prop="complainant" label="Reclamante" min-width="120" show-overflow-tooltip></el-table-column>
    <el-table-column prop="type" label="Tipo de queja" min-width="140" show-overflow-tooltip></el-table-column>
    <el-table-column prop="date" label="Fecha de la queja" min-width="130"></el-table-column>
    <el-table-column prop="content" label="Contenido de la queja" min-width="150" show-overflow-tooltip></el-table-column>
    <el-table-column prop="phone" label="Contacto" min-width="120"></el-table-column>
    <el-table-column align="center" label="Acciones" width="210" class-name="complaint-actions-column">
      <template slot-scope="scope">
        <div class="row-actions">
          <el-button size="mini" icon="el-icon-chat-dot-round" @click="dialogVisible = true">Responder</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>

    <el-dialog title="Responder" :visible.sync="dialogVisible" width="30%" custom-class="app-dialog" append-to-body>
      <el-input type="textarea" :rows="5" placeholder="Introduzca el contenido" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancelar</el-button>
      <el-button type="primary" @click="submit">Aceptar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table: [],
        dialogVisible: false,
        textarea: ''
      };
    },
    methods: {
      handleDelete (index, row) {
        let vm = this;
        vm.table.splice(index, 1);
        this.$message({
          message: '¡Eliminado correctamente!',
          type: 'success'
        });
      },
      submit () {
        this.dialogVisible = false;
        this.textarea = '';
        this.$message({
          message: 'Respondido, ¡consulte la consola!',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.complainInfo).then((response) => {             // mark
        this.table = response.body.table;
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
  .checkInfo
    .complaint-actions-column
      .cell
        padding:8px

      .row-actions
        display:flex
        justify-content:center
        gap:4px
        padding-right:4px

        .el-button + .el-button
          margin-left:0
</style>