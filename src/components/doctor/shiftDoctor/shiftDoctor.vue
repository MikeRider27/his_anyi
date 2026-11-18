<template>
  <div class="shiftDoctor">
    <h1 class="listing-page-title">Tabla de turnos de médicos</h1>
    <div class="search">
     <el-input class="doctor-shift-search-input" placeholder="Nombre del médico"></el-input>
     <el-button  type="primary" icon="el-icon-search" @click="">Buscar</el-button>
     <el-button class="filter-item" icon="el-icon-document" @click="handleDownload">Exportar</el-button>
    </div>
    <el-table :data="shiftList" stripe style="width: 100%;">
      <el-table-column prop="date" label="Fecha del turno" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column prop="dates" label="Franja horaria" min-width="170" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="index" label="N.º" width="64">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" min-width="110" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="Sexo" min-width="75">
      </el-table-column>
      <el-table-column prop="office" label="Departamento" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="number" label="Teléfono" min-width="120">
      </el-table-column>
      <el-table-column prop="attendance" label="Asistencia" min-width="115" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="signatory" label="Firma del jefe" min-width="115" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="Acciones" width="180" align="center" class-name="doctor-shift-actions-column">
        <template slot-scope="scope">
          <div class="row-actions">
            <el-button @click.native.prevent="edictDoctor(scope.$index, scope.row)" type="primary" size="mini" icon="el-icon-edit">Editar</el-button>
            <el-button @click.native.prevent="delectDoctor(scope.$index, shiftList)" type="danger" size="mini" icon="el-icon-delete">Eliminar</el-button>
          </div>
        </template>
      </el-table-column>     
    </el-table>
    <el-dialog title="Modificar turno" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>

      <el-form>
        <el-form-item label="Fecha del turno" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="Franja horaria" :label-width="formLabelWidth">
          <el-select v-model="form.dates" placeholder="Seleccione" style="width: 100%;">
            <el-option label="Turno temprano: 6:00~17:00" name="lessMorning" value="Turno temprano: 6:00~17:00"></el-option>
            <el-option label="Turno de día: 10:00~21:00" name="Morning" value="Turno de día: 10:00~21:00"></el-option>
            <el-option label="Noche corta: 16:00~00:00" name="lessNinght" value="Noche corta: 16:00~00:00"></el-option>
            <el-option label="Noche larga: 00:00~8:00" name="Ninght" value="Noche larga: 00:00~8:00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nombre" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sexo"  :label-width="formLabelWidth">
          <el-radio class="radio" v-model="form.sex" label="Hombre">Hombre</el-radio>
          <el-radio class="radio" v-model="form.sex" label="Mujer">Mujer</el-radio>
        </el-form-item>
        <el-form-item label="Departamento"  :label-width="formLabelWidth">
          <el-input v-model="form.office" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Teléfono" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Asistencia" :label-width="formLabelWidth">
          <el-select v-model="form.attendance" placeholder="Seleccione" style="width: 100%;">
            <el-option label="Retraso" name="late" value="Retraso"></el-option>
            <el-option label="Salida anticipada" name="early" value="Salida anticipada"></el-option>
            <el-option label="Horario laboral" name="bework" value="Horario laboral"></el-option>
            <el-option label="Horas extra" name="overtime" value="Horas extra"></el-option>
            <el-option label="Baja por enfermedad" name="sickleave" value="Baja por enfermedad"></el-option>
            <el-option label="Descanso oficial" name="generalholiday" value="Descanso oficial"></el-option>
            <el-option label="Otros" name="others" value="Otros"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Firma del jefe"  :label-width="formLabelWidth">
          <el-input v-model="form.signatory" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">Restablecer</el-button>
        <el-button type="primary"  @click="submitForm('form')">Aceptar</el-button>
      </div>
    </el-dialog>
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
          shiftList: [],
          // Store one row of data in form
          Index: '',
          form: [],
          dialogFormVisible: false,
          formLabelWidth: '60px',
          currentPage: 5
        };
      },
      methods: {
        // Triggered by clicking Edit in the table, to modify the row
        edictDoctor (index, rows) {
          this.dialogFormVisible = true;
          // this.form = row;
          this.form = rows;
          // Deep copy
          // this.form = JSON.parse(JSON.stringify(rows[index]));
          this.Index = index;
          this.form2 = rows;
          // rows[index] = this.form;
        },
        // Delete a row
        delectDoctor (index, rows) {
          rows.splice(index, 1);
        },
        // Date format conversion
        updateDoctor () {
          let year = this.form.date.getFullYear();
          let month = this.form.date.getMonth() + 1;
          let day = this.form.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          this.form.date = dateFormat;
        },
        // Dialog Triggered by the dialog OK button
        submitForm (formName) {
          this.dialogFormVisible = false;
          this.updateDoctor();
          this.shiftList[this.Index] = this.form;
          this.$message({
            message: 'Turno modificado correctamente',
            type: 'success'
          });
          // else {
          //     this.$message.error('Failed to update doctor info');
          //     return false;
          //   }
          // }
        },
          // });
        // resetForm (formName) {
        //   this.$refs[formName].resetFields();
        // },
        // Export table
        handleDownload () {
          // Export
          var vm = this;
          import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
            const tHeader = ['Fecha del turno', 'Franja horaria', 'Nombre', 'Sexo', 'Departamento', 'Teléfono', 'Asistencia', 'Firma del jefe'];
            const filterVal = ['date', 'dates', 'name', 'sex', 'office', 'number', 'attendance', 'signatory'];
            const shiftList = vm.shiftList;
            const data = vm.formatJson(filterVal, shiftList);
            export_json_to_excel(tHeader, data, 'Lista de turnos de médicosexcel');
          });
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // Export table
        handleSizeChange (val) {
        },
        handleCurrentChange (val) {
        }
      },
      // Fetch JSON data
      created () {
        this.$http.get(api.shiftList).then((response) => {             // mark
          this.shiftList = response.body.shiftList;
        }, response => {
          // error callback
          this.$message({
            message: 'Error al solicitar los datos',
            type: 'error'
          });
        });
        // this.updateDoctor();
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shiftDoctor
    .search
      margin-bottom:16px

      .doctor-shift-search-input
        width:200px
        flex:1 1 180px
        max-width:260px

    .doctor-shift-actions-column
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
    .shiftDoctor
      .search
        .doctor-shift-search-input
          max-width:none

      .block
        justify-content:flex-start

</style>
