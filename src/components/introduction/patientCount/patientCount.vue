<template>
  <div class="patientCount">
    <div class="title">
      <p>Estadística semanal de pacientes del Hospital Anyi</p>
    </div>
    
    <div class="weekly-statistics-grid">
    <div class="tableCount">
      <el-table :data="table1" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Lunes">
          <el-table-column prop="department" :summary-method="getSummaries" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table2" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Martes">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table3" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Miércoles">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table4" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Jueves">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table5" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Viernes">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table6" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Sábado">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableCount">
      <el-table :data="table7" show-summary :summary-method="getSummaries" border style="width:100%">
        <el-table-column label="Domingo">
          <el-table-column prop="department" label="Departamento"></el-table-column>
          <el-table-column prop="date" label="Fecha de consulta"></el-table-column>
          <el-table-column prop="number" label="Pacientes atendidos"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    </div>
   <!--  <div class="button">
      <el-button type="primary" size="big" @click="amount">View total</el-button>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table1: [],
        table2: [],
        table3: [],
        table4: [],
        table5: [],
        table6: [],
        table7: [],
        personSum: []
      };
    },
    methods: {
      getSummaries (param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            this.personSum = sums[index];
            sums[index] += ' personas';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      }
      // amount () {
      // }
    },
    created () {
      this.$http.get(api.patientCount).then((response) => {             // mark
        this.table1 = response.body.table1;
        this.table2 = response.body.table2;
        this.table3 = response.body.table3;
        this.table4 = response.body.table4;
        this.table5 = response.body.table5;
        this.table6 = response.body.table6;
        this.table7 = response.body.table7;
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
  .patientCount
    .title p
      margin:0 0 20px
      color:#263b4d
      font-size:24px
      font-weight:600
      text-align:center

    .weekly-statistics-grid
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:24px

    .tableCount
      min-width:0

    .el-table
      width:100%

      th .cell
        white-space:normal
        line-height:1.35

  @media (max-width: 1050px)
    .patientCount .weekly-statistics-grid
      grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 650px)
    .patientCount
      .weekly-statistics-grid
        grid-template-columns:minmax(0, 1fr)

      .title p
        font-size:20px
</style>