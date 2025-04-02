<template>
  <div class="game-container">
    <!-- 顶部个人信息 -->
    <div class="user-section" v-if="isLoggedIn">
      <div class="user-info" @click="goToProfile">
        <div class="user-detail">
          <span class="username">登陆人：{{ user.username }}</span>
          <span class="coin-count">金币：{{ user.coins }}</span>
        </div>
      </div>
    </div>
    <!-- 未登录时显示登录注册 -->
    <div class="auth-section" v-else>
      <button class="auth-btn login-btn" @click="goToLogin">登录</button>
      <button class="auth-btn register-btn" @click="goToRegister">注册</button>
    </div>

    <!-- 游戏大厅 -->
    <div class="lobby-section">
      <div class="lobby-header">
        <h2>游戏大厅</h2>
        <span class="online-count">在线人数：{{ onlineCount }}</span>
      </div>

      <div class="room-list">
        <div class="room-item" v-for="room in rooms" :key="room.id">
          <div class="room-info">
            <span class="room-name">{{ room.name }}</span>
            <span class="room-status" :class="room.status">{{ room.statusText }}</span>
          </div>
          <div class="room-players">
            <span class="player-count">{{ room.players.length }}/10</span>
            <button
              class="join-btn"
              :disabled="!isLoggedIn || room.isFull"
              @click="joinRoom(room.id)"
            >
              {{ room.isFull ? '已满' : '加入' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlineCount: 1234,
      rooms: [
        {
          id: 1,
          name: '初级场',
          status: 'waiting',
          statusText: '等待中',
          players: new Array(3).fill({}),
          isFull: false
        },
        {
          id: 2,
          name: '中级场',
          status: 'playing',
          statusText: '游戏中',
          players: new Array(10).fill({}),
          isFull: true
        }
        // 更多房间...
      ]
    }
  },
  computed: {
    isLoggedIn() {
      let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
      console.log(userInfo,'userInfo')
      return Object.keys(userInfo).length ? true : false
    },
    user() {
      let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
      return userInfo
    }
  },
  methods: {
    goToLogin() {
      this.$router.push({
        name:'gameLogin'
      })
    },
    goToRegister() {
      this.$router.push({
        name:'gameRegister'
      })
    },
    goToProfile() {
      this.$router.push({
          name:'gameUserInfo'
      })
    },
    joinRoom(roomId) {
      if (!this.isLoggedIn) {
        alert('请先登录')
        return
      }
      // 加入房间逻辑
      console.log('加入房间:', roomId)
    }
  }
}
</script>

<style scoped lang="scss">
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #4CAF50 0%, #81C784 100%);
  color: #fff;
  font-family: 'PingFang SC', sans-serif;
}

.user-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #fff;
    }

    .user-detail {
      display: flex;
      align-items: center;

      .username {
        font-size: 1rem;
        font-weight: 500;
        margin-right: 40px;
      }

      .coin-count {
        font-size: 1rem;
        color: #FFD700;
      }
    }
  }
}

.auth-section {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);

  .auth-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &.login-btn {
      background: #2196F3;
      &:hover {
        background: darken(#2196F3, 10%);
      }
    }

    &.register-btn {
      background: #FF9800;
      &:hover {
        background: darken(#FF9800, 10%);
      }
    }
  }
}

.lobby-section {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  .lobby-header {
    margin-bottom: 1.5rem;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .online-count {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.8);
    }
  }

  .room-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .room-item {
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(5px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);

      .room-info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .room-name {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .room-status {
          font-size: 0.8rem;
          color: #C8E6C9;

          &.playing {
            color: #FF6B6B;
          }
        }
      }

      .room-players {
        display: flex;
        align-items: center;
        gap: 1rem;

        .player-count {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
        }

        .join-btn {
          padding: 0.5rem 1rem;
          background: #FFC107;
          border: none;
          border-radius: 20px;
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;

          &:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          &:not(:disabled):hover {
            background: darken(#FFC107, 10%);
          }
        }
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .user-section {
    padding: 0.8rem;

    .user-info {
      .avatar {
        width: 36px;
        height: 36px;
      }

      .user-detail {
        .username {
          font-size: 0.9rem;
        }

        .coin-count {
          font-size: 1rem;
        }
      }
    }
  }

  .auth-section {
    padding: 0.8rem;

    .auth-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }

  .lobby-section {
    padding: 0.8rem;

    .lobby-header h2 {
      font-size: 1.3rem;
    }

    .room-list {
      .room-item {
        padding: 0.8rem;

        .room-info .room-name {
          font-size: 1rem;
        }

        .room-players {
          gap: 0.8rem;

          .join-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}
</style>
